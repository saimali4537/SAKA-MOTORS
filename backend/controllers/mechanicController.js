import asyncHandler from 'express-async-handler';
import Mechanaic from '../models/mechanicModel.js';
import Prot from '../models/protModel.js';
import generateToken from '../utils/generateToken.js'

// @desc    Auth mechanic and get token
// @route   POST /api/mechanics/login
// @access  Public
const authMechanaic = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const mechanic = await Mechanaic.findOne({ email })

  if (mechanic && (await mechanic.matchPassword(password))) {
    res.json({
      _id: mechanic._id,
      name: mechanic.name,
      email: mechanic.email,
      isAdmin: mechanic.isAdmin,
      token: generateToken(mechanic._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new mechanic
// @route   POST /api/mechanics
// @access  Public
const registerMechanaic = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body

  const mechanicExist = await Mechanaic.findOne({ email })

  if (mechanicExist) {
    res.status(400)
    throw new Error('Mechanaic already exists')
  }

  const mechanic = await Mechanaic.create({
    name,
    email,
    password,
    isAdmin
  })

  if (mechanic) {
    res.status(201).json({
      _id: mechanic._id,
      name: mechanic.name,
      email: mechanic.email,
      isAdmin: mechanic.isAdmin,
      token: generateToken(mechanic._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid mechanic data')
  }
})

// @desc    Get mechanic profile
// @route   GET /api/mechanics/profile
// @access  Private
const getMechanaicProfile = asyncHandler(async (req, res) => {
  const mechanic = await Mechanaic.findById(req.mechanic._id)

  if (mechanic) {
    res.json({
      _id: mechanic._id,
      name: mechanic.name,
      email: mechanic.email,
      isAdmin: mechanic.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('Mechanaic not found')
  }
})

// @desc    Update mechanic profile
// @route   PUT /api/mechanics/profile
// @access  Private
const updateMechanaicProfile = asyncHandler(async (req, res) => {
  const mechanic = await Mechanaic.findById(req.mechanic._id)

  if (mechanic) {
    mechanic.name = req.body.name || mechanic.name
    mechanic.email = req.body.email || mechanic.email
    if (req.body.password) {
      mechanic.password = req.body.password
    }

    const updatedMechanaic = await mechanic.save()

    res.json({
      _id: updatedMechanaic._id,
      name: updatedMechanaic.name,
      email: updatedMechanaic.email,
      isAdmin: updatedMechanaic.isAdmin,
      token: generateToken(updatedMechanaic._id)
    })
  } else {
    res.status(404)
    throw new Error('Mechanaic not found')
  }
})

// @desc    Get all mechanics
// @route   GET /api/mechanics
// @access  Private/Mechanaic
const getMechanaics = asyncHandler(async (req, res) => {
  const mechanics = await Mechanaic.find({})
  res.json(mechanics)
})

// @desc    Delete mechanic
// @route   DELETE /api/mechanics/:id
// @access  Private/Mechanaic
const deleteMechanaic = asyncHandler(async (req, res) => {
  const mechanic = await Mechanaic.findById(req.params.id)

  if (mechanic) {
    const prot = await Prot.find({ user: mechanic._id })
    const prots = await Prot.findById(prot[0]._id)
    await prots.remove()
    await mechanic.remove()
    res.json({ message: 'Mechanaic removed' })
  } else {
    res.status(404)
    throw new Error('Mechanaic not found')
  }
})

// @desc    Get mechanic by ID
// @route   GET /api/mechanics/:id
// @access  Private/Mechanaic
const getMechanaicById = asyncHandler(async (req, res) => {
  const mechanic = await Mechanaic.findById(req.params.id).select('-password')

  if (mechanic) {
    res.json(mechanic)
  } else {
    res.status(404)
    throw new Error('Mechanaic not found')
  }
})

// @desc    Update mechanic
// @route   PUT /api/mechanics/:id
// @access  Private/Mechanaic
const updateMechanaic = asyncHandler(async (req, res) => {
  const mechanic = await Mechanaic.findById(req.params.id)

  if (mechanic) {
    mechanic.name = req.body.name || mechanic.name
    mechanic.email = req.body.email || mechanic.email

    const updatedMechanaic = await mechanic.save()

    res.json({
      _id: updatedMechanaic._id,
      name: updatedMechanaic.name,
      email: updatedMechanaic.email,
    })
  } else {
    res.status(404)
    throw new Error('Mechanaic not found')
  }
})

export {
  authMechanaic,
  registerMechanaic,
  getMechanaicProfile,
  updateMechanaicProfile,
  getMechanaics,
  deleteMechanaic,
  getMechanaicById,
  updateMechanaic
}