import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js'
import Post from '../models/postModel.js';
import Auction from '../models/auctionModel.js';
import Bid from '../models/bidModel.js';
import Otp from '../models/otpModel.js';
import nodemailer from 'nodemailer'




// @desc    Auth user and get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isManager: user.isManager,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isManager } = req.body

  const userExist = await User.findOne({ email })

  if (userExist) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    isManager
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isManager: user.isManager,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isManager: user.isManager
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isManager: updatedUser.isManager,
      token: generateToken(updatedUser._id)
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfileP = asyncHandler(async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email: email })

  if (user) {
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      isManager: updatedUser.isManager,
      token: generateToken(updatedUser._id)
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Manager
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

const countUsers = asyncHandler(async (req, res) => {
  const users= await User.count({})
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Manager
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    const post = await Post.find({ user: user._id })
  const lena=post.length
  for(var i=0;i<lena;i++){
    const posts = await Post.findById(post[i]._id)
  await posts.remove()
  }
  const auction = await Auction.find({ user: user._id })
  const auctions = await Auction.findById(auction[0]._id)
  await auctions.remove()
  const bid = await Bid.find({ user: user._id })
  const len=bid.length
  for(var i=0;i<len;i++){
    const bids = await Bid.findById(bid[i]._id)
  await bids.remove()
  }
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Manager
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Manager
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


const emailSend = asyncHandler(async (req, res) => {
  const { email } = req.body
  let data = await User.findOne({ email: email })
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
  let data = await User.findOne({ email: email })
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
      throw new Error('User Not Exist')
   
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
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  updateUserProfileP,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  countUsers,
  emailSend,
  emailSendf,
  emailSucc
}