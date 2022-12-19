import asyncHandler from 'express-async-handler';
import Prot from '../models/protModel.js';

// @desc    Fetch all prots
// @route   GET /api/prots
// @access  Public
const getProts = asyncHandler(async (req, res) => {
  const pageSize = 1000
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {}

  const count = await Prot.countDocuments({ ...keyword })
  const prots = await Prot.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ prots, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single prot
// @route   GET /api/prots/:id
// @access  Public
const getProtById = asyncHandler(async (req, res) => {
  const prot = await Prot.findById(req.params.id);

  if (prot) {
    res.json(prot);
  } else {
    res.status(404);
    throw new Error('Prot not found');
  }
})

// @desc    Delete a prot
// @route   DELETE /api/prots/:id
// @access  Private/Admin
const deleteProt = asyncHandler(async (req, res) => {
  const prot = await Prot.findById(req.params.id)

  if (prot) {
    await prot.remove()
    res.json({ message: 'Prot removed' })
  } else {
    res.status(404)
    throw new Error('Prot not found')
  }
})

// @desc    Create a prot
// @route   POST /api/prots
// @access  Private/Admin
const createProt = asyncHandler(async (req, res) => {
  const {
    name,
    Avg,
    location,
    image,
    store,
    category,
    cnt,
  } = req.body
  const prot = new Prot({
    name: name,
    user: req.mechanic._id,
    Avg: Avg,
    location: location,
    image: image,
    store: store,
    category: category,
    cnt: cnt,
    numReviews: 0,
    
  })
  const prots = await Prot.find({ user: req.mechanic._id })
  if (prots.length===0) {
    const createdProt = await prot.save()
  res.status(201).json(createdProt)

  } else {
    res.status(404);
    throw new Error('Sorry, You can have only One Profile At a Time');
  }
  
})

// @desc    Update a prot
// @route   PUT /api/prots/:id
// @access  Private/Admin
const updateProt = asyncHandler(async (req, res) => {
  const {
    name,
    Avg,
    location,
    image,
    store,
    category,
    cnt,
  } = req.body

  const prot = await Prot.findById(req.params.id)

  if (prot) {
    prot.name = name
    prot.Avg = Avg
    prot.location = location
    prot.image = image
    prot.store = store
    prot.category = category
    prot.cnt=cnt

    const updatedProt = await prot.save()
    res.json(updatedProt)
  } else {
    res.status(404)
    throw new Error('Prot not found')
  }
})

// @desc    Create new review
// @route   POST /api/prots/:id/reviews
// @access  Private
const createProtReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const prot = await Prot.findById(req.params.id)

  if (prot) {
    const alreadyReviewed = prot.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Prot already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    prot.reviews.push(review)

    prot.numReviews = prot.reviews.length

    prot.rating =
      prot.reviews.reduce((acc, item) => item.rating + acc, 0) /
      prot.reviews.length

    await prot.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Prot not found')
  }
})

// @desc    Get top rated prots
// @route   GET /api/prots/top
// @access  Public
const getTopProts = asyncHandler(async (req, res) => {
  const limit = 3
  const prots = await Prot.find({}).sort({ rating: -1 }).limit(limit)

  res.json(prots)
})

const getMyProts = asyncHandler(async (req, res) => {
  const prots = await Prot.find({ user: req.mechanic._id })
  res.json(prots)
})

export {
  getProts,
  getProtById,
  deleteProt,
  createProt,
  updateProt,
  createProtReview,
  getTopProts,
  getMyProts
}