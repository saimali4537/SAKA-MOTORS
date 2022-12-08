import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler';
import Manager from '../models/managerModel.js'
import Mechanic from '../models/mechanicModel.js'
import Admin from '../models/adminModel.js'
import User from '../models/userModel.js'

const protectu = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('No authorized, no token')
  }
})

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.manager = await Manager.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('No authorized, no token')
  }
})

const manager = (req, res, next) => {
  if (req.manager && req.manager.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an Manager')
  }
}
const protectm = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.mechanic = await Mechanic.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('No authorized, no token')
  }
})
const mechanic = (req, res, next) => {
  if (req.mechanic && req.mechanic.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an Mechanic')
  }
}

const protecta = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.admin = await Admin.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('No authorized, no token')
  }
})

const admin = (req, res, next) => {
  if (req.admin && req.admin.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an Admin')
  }
}

export { protect, manager, admin,mechanic, protectm, protecta, protectu }