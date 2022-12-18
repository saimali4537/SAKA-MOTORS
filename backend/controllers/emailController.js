import asyncHandler from 'express-async-handler';
import Email from '../models/emailModel.js';

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const addEmail = asyncHandler(async (req, res) => {
  const { email } = req.body

  const emailExist = await Email.findOne({ email })

  if (emailExist) {
    res.status(400)
    throw new Error('Email already exists')
  }

  const mail = await Email.create({
    email,
  })

  if (mail) {
    res.status(201).json({
      _id: mail._id,
      email: mail.email,
      token: generateToken(mail._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid mail')
  }
})
const getEmails = asyncHandler(async (req, res) => {
  const emails = await Email.find({})
  res.json(emails)
})


export {
  addEmail,
  getEmails
}