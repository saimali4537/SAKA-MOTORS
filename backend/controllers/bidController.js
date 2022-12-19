import asyncHandler from 'express-async-handler';
import Auction from '../models/auctionModel.js';
import Bid from '../models/bidModel.js';

// @desc    Fetch all bids
// @route   GET /api/bids
// @access  Public
const getBids = asyncHandler(async (req, res) => {
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

  const count = await Bid.countDocuments({ ...keyword })
  const bids = await Bid.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ bids, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single bid
// @route   GET /api/bids/:id
// @access  Public
const getBidById = asyncHandler(async (req, res) => {
  const bid = await Bid.findById(req.params.id);

  if (bid) {
    res.json(bid);
  } else {
    res.status(404);
    throw new Error('Bid not found');
  }
})

// @desc    Delete a bid
// @route   DELETE /api/bids/:id
// @access  Private/Admin
const deleteBid = asyncHandler(async (req, res) => {
  const bid = await Bid.findById(req.params.id)

  if (bid) {
    await bid.remove()
    res.json({ message: 'Bid removed' })
  } else {
    res.status(404)
    throw new Error('Bid not found')
  }
})

// @desc    Create a bid
// @route   POST /api/bids
// @access  Private/Admin
const createBid = asyncHandler(async (req, res) => {
  const {
    name,
    cnt,
    bide
  } = req.body
  const bid = new Bid({
    user: req.user._id,
    auction: req.params.id,
    name: name,
    cnt: cnt,
    bide: bide,
  
    
  })

  const bids = await Bid.find({ user: req.user._id })
  if (bids.length===0) {
    const createdBid = await bid.save()
    res.status(201).json(createdBid)
  } else {
   res.status(404)
    throw new Error('Sorry, You Already Bid on this Post')
    
}})

// @desc    Update a bid
// @route   PUT /api/bids/:id
// @access  Private/Admin
const updateBid = asyncHandler(async (req, res) => {
  const {
    name,
    cnt,
    bide
  } = req.body

  const bid = await Bid.findById(req.params.id)

  if (bid) {
    bid.name = name
    bid.cnt = cnt
    bid.bide = bide

    const updatedBid = await bid.save()
    res.json(updatedBid)
  } else {
    res.status(404)
    throw new Error('Bid not found')
  }
})

// @desc    Get top rated bids
// @route   GET /api/bids/tops
// @access  Public
const getTopBids = asyncHandler(async (req, res) => {
  const limit = 5
  const bids = await Bid.find({ auction: req.params.id}).sort({ bide: -1 }).limit(limit)
  

  res.json(bids)
})

const getMyBids = asyncHandler(async (req, res) => {
    const auctions = await Auction.find({ user: req.user._id })
    if(auctions.length===0){
      res.json(auctions)
    }else{
    const bids= await Bid.find({auction: auctions[0]._id}).sort({ bide: -1 })
    res.json(bids)
    }
})
const getMBids = asyncHandler(async (req, res) => {
  const bids = await Bid.find({ user: req.user._id })
  res.json(bids)
})


export {
  getBids,
  getBidById,
  deleteBid,
  createBid,
  updateBid,
  getTopBids,
  getMyBids,
  getMBids
}