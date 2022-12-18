import asyncHandler from 'express-async-handler';
import Admin from '../models/adminModel.js';
import Otp from '../models/otpModel.js';
import generateToken from '../utils/generateToken.js'
import nodemailer from 'nodemailer'

// @desc    Auth admin and get token
// @route   POST /api/admins/login
// @access  Public
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const admin = await Admin.findOne({ email })

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      isAdmin: admin.isAdmin,
      token: generateToken(admin._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})


const emailSend = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  let data = await Admin.findOne({email: email});
  const responseType={};
  if(data && (await data.matchPassword(password))){
    let otpcode = Math.floor((Math.random()*10000)+1)
 let otpData= new Otp({
  email: 'sakamotorad@gmail.com',
  code: otpcode,
  expireIn: new Date().getTime()+300*1000
})
    let otpResponse = await otpData.save();
    responseType.statusText='Success'
    mailer(email,otpcode)
    responseType.message='Please check your Email Id';
    return res.json({
      _id: data._id,
      name: data.name,
      email: data.email,
      isAdmin: data.isAdmin,
      token: generateToken(data._id)
    })
  }else{
      res.status(400)
      throw new Error('Invalid email or password')
   
  }
})


const emailSucc = asyncHandler(async (req, res) => {
  const { otp } = req.body
  let data= await Otp.findOne({code:otp})
  let dataa = await Admin.findOne({email: 'sakamotorad@gmail.com'});
  const response={}
  if(data){
    let currentTime=new Date().getTime()
    let diff=data.expirein - currentTime;
    if(diff<0){
      response.message='Token expire'
      response.statusText='error'
    }else{
      response.message='Successful Login'
      response.statusText='Success'
      return res.json({
        _id: dataa._id,
        name: dataa.name,
        email: dataa.email,
        isAdmin: dataa.isAdmin,
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
      subject: 'Your SAKA Motors Amin Otp is: ',
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
  authAdmin,
  emailSend,
  emailSucc
}