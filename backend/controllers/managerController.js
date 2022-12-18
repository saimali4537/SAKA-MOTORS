import asyncHandler from 'express-async-handler';
import Manager from '../models/managerModel.js';
import Store from '../models/storeModel.js'
import Product from '../models/productModel.js'
import generateToken from '../utils/generateToken.js'
import Otp from '../models/otpModel.js';
import nodemailer from 'nodemailer'

// @desc    Auth manager and get token
// @route   POST /api/managers/login
// @access  Public
const authManager = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const manager = await Manager.findOne({ email })

  if (manager && (await manager.matchPassword(password))) {
    res.json({
      _id: manager._id,
      name: manager.name,
      email: manager.email,
      isAdmin: manager.isAdmin,
      token: generateToken(manager._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new manager
// @route   POST /api/managers
// @access  Public
const registerManager = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body

  const managerExist = await Manager.findOne({ email })

  if (managerExist) {
    res.status(400)
    throw new Error('Manager already exists')
  }

  const manager = await Manager.create({
    name,
    email,
    password,
    isAdmin
  })

  if (manager) {
    res.status(201).json({
      _id: manager._id,
      name: manager.name,
      email: manager.email,
      isAdmin: manager.isAdmin,
      token: generateToken(manager._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid manager data')
  }
})

// @desc    Get manager profile
// @route   GET /api/managers/profile
// @access  Private
const getManagerProfile = asyncHandler(async (req, res) => {
  const manager = await Manager.findById(req.manager._id)

  if (manager) {
    res.json({
      _id: manager._id,
      name: manager.name,
      email: manager.email,
      isAdmin: manager.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('Manager not found')
  }
})

// @desc    Update manager profile
// @route   PUT /api/managers/profile
// @access  Private
const updateManagerProfile = asyncHandler(async (req, res) => {
  const manager = await Manager.findById(req.manager._id)

  if (manager) {
    manager.name = req.body.name || manager.name
    manager.email = req.body.email || manager.email
    if (req.body.password) {
      manager.password = req.body.password
    }

    const updatedManager = await manager.save()

    res.json({
      _id: updatedManager._id,
      name: updatedManager.name,
      email: updatedManager.email,
      isAdmin: updatedManager.isAdmin,
      token: generateToken(updatedManager._id)
    })
  } else {
    res.status(404)
    throw new Error('Manager not found')
  }
})
const updateManagerProfileP = asyncHandler(async (req, res) => {
  const { email } = req.body
  const manager = await Manager.findOne({ email: email })

  if (manager) {
    manager.email = req.body.email || manager.email
    if (req.body.password) {
      manager.password = req.body.password
    }

    const updatedManager = await manager.save()

    res.json({
      _id: updatedManager._id,
      email: updatedManager.email,
      isManager: updatedManager.isManager,
      token: generateToken(updatedManager._id)
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
// @desc    Get all managers
// @route   GET /api/managers
// @access  Private/Manager
const getManagers = asyncHandler(async (req, res) => {
  const managers = await Manager.find({})
  res.json(managers)
})

// @desc    Delete manager
// @route   DELETE /api/managers/:id
// @access  Private/Manager
const deleteManager = asyncHandler(async (req, res) => {
  const manager = await Manager.findById(req.params.id)

  if (manager) {
  const store = await Store.find({ user: manager._id })
  const len=store.length
  for(var i=0;i<len;i++){
    const stores = await Store.findById(store[i]._id)
    await stores.remove()
  }
  const product = await Product.find({ user: manager._id })
  const lena=product.length
  for(var i=0;i<lena;i++){
    const products = await Product.findById(product[i]._id)
  await products.remove()
  }
  
  await manager.remove()

  
    res.json({ message: 'Manager removed' })
  }
 else {
    res.status(404)
    throw new Error('Manager not found')
  }
})

// @desc    Get manager by ID
// @route   GET /api/managers/:id
// @access  Private/Manager
const getManagerById = asyncHandler(async (req, res) => {
  const manager = await Manager.findById(req.params.id).select('-password')

  if (manager) {
    res.json(manager)
  } else {
    res.status(404)
    throw new Error('Manager not found')
  }
})

// @desc    Update manager
// @route   PUT /api/managers/:id
// @access  Private/Manager
const updateManager = asyncHandler(async (req, res) => {
  const manager = await Manager.findById(req.params.id)

  if (manager) {
    manager.name = req.body.name || manager.name
    manager.email = req.body.email || manager.email

    const updatedManager = await manager.save()

    res.json({
      _id: updatedManager._id,
      name: updatedManager.name,
      email: updatedManager.email,
    })
  } else {
    res.status(404)
    throw new Error('Manager not found')
  }
})
const emailSend = asyncHandler(async (req, res) => {
  const { email } = req.body
  let data = await Manager.findOne({ email: email })
  const responseType={};
  if(!data){
    let otpcode = Math.floor((Math.random()*10000)+1)
    let otpData= new Otp({
     email: email,
     code: otpcode,
     expireIn: new Date().getTime()+300*1000
})
    let otpResponse = await otpData.save();
    responseType.statusText='Success'
    mailer(email,otpcode)
    responseType.message='Please check your Email Id';
  }else{
      res.status(400)
      throw new Error('User Already Exist')
   
  }
  
})
const emailSendf = asyncHandler(async (req, res) => {
  const { email } = req.body
  let data = await Manager.findOne({ email: email })
  const responseType={};
  if(data){
    let otpcode = Math.floor((Math.random()*10000)+1)
    let otpData= new Otp({
     email: email,
     code: otpcode,
     expireIn: new Date().getTime()+300*1000
})
    let otpResponse = await otpData.save();
    responseType.statusText='Success'
    mailer(email,otpcode)
    responseType.message='Please check your Email Id';
  }else{
      res.status(400)
      throw new Error('Manager Not Exist')
   
  }
  
})

const emailSucc = asyncHandler(async (req, res) => {
  const { otp, email } = req.body
  let data= await Otp.findOne({code:otp, email:email})
  const response={}
  if(data ){
    let currentTime=new Date().getTime()
    let diff=data.expirein - currentTime;
    if(diff<0){
      response.message='Token expire'
      response.statusText='error'
    }else{
      response.message='Successful Login'
      response.statusText='Success'
      return res.json({
      _id: data._id,
      email: email,
      token: generateToken(data._id)
      })
    }
  }else{
    res.status(500)
      throw new Error('Invalid Otp')
  }
  res.status(200).json(response)

})
const mailer=(email, otp)=>{
 
 
  let mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'sakaamotors@gmail.com',
          pass: 'jcmvqguxwbzxbpfw'
      }
  });
   
  let mailDetails = {
      from: 'sakaamotors@gmail.com',
      to: email,
      subject: 'Your SAKA Motors Otp is: ',
      text: otp+' is your one time password, Please donot share it with anyone'
  };
   
  mailTransporter.sendMail(mailDetails, function(err, info) {
      if(err) {
        response.message='Error Occurs'
      } else {
        response.message='Email sent successfully'
      }
      res.status(200).json(response)
  });
}

export {
  authManager,
  registerManager,
  getManagerProfile,
  updateManagerProfile,
  updateManagerProfileP,
  getManagers,
  deleteManager,
  getManagerById,
  updateManager,
  emailSend,
  emailSendf,
  emailSucc
}