import asyncHandler from 'express-async-handler';
import Auction from '../models/auctionModel.js';
import server from 'http';
import { Server } from "socket.io";
const io = new Server(server);

// @desc    Fetch all auctions
// @route   GET /api/auctions
// @access  Public
const getAuctions = asyncHandler(async (req, res) => {
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

  const count = await Auction.countDocuments({ ...keyword })
 
  const auctions = await Auction.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ auctions, page, pages: Math.ceil(count / pageSize) })
})



// @desc    Fetch single auction
// @route   GET /api/auctions/:id
// @access  Public
const getAuctionById = asyncHandler(async (req, res) => {
  const auction = await Auction.findById(req.params.id);

  if (auction) {
    res.json(auction);
  } else {
    res.status(404);
    throw new Error('Auction not found');
  }
})

// @desc    Delete a auction
// @route   DELETE /api/auctions/:id
// @access  Private/Admin
const deleteAuction = asyncHandler(async (req, res) => {
  const auction = await Auction.findById(req.params.id)

  if (auction) {
    await auction.remove()
    res.json({ message: 'Auction removed' })
  } else {
    res.status(404)
    throw new Error('Auction not found')
  }
})

// @desc    Create a auction
// @route   AUCTION /api/auctions
// @access  Private/Admin
const createAuction = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    image1,
    image2,
    image3,
    image4,
    model,
    cnt,
    location,
  } = req.body
  const auction = new Auction({
    name: name,
    price: price,
    user: req.user._id,
    image: image,
    image1: image1,
    image2: image2,
    image3: image3,
    image4: image4,
    model:  model,
    cnt: cnt,
    location: location,
    numReviews: 0,
    description: description,
    
  })
  try {
    auction.timer = parseInt(259200);
    let duration = parseInt(259200);
    let timer = parseInt(auction.timer);
    let intervalTimer = setInterval(async () => {
      timer -= 1;
      await auction.updateOne({ timer: timer });
      io
        .to(auction._id.toString())
        .emit('timer', {
          action: 'timerUpdate',
          data: { timer: timer, _id: auction._id },
        });
    }, 1000);
    (duration + 1) * 1000;
}catch (err) {
  console.log(err);
  res.status(500).json({ errors: [{ msg: 'Server error' }] });
}
  const auctions = await Auction.find({ user: req.user._id })
  if (auctions.length===0) {
    const createdAuction = await auction.save()
    res.status(201).json(createdAuction)
  } else {
    res.status(404);
    throw new Error('Sorry, You can post only One Auction Post At a Time');
  }


})

// @desc    Update a auction
// @route   PUT /api/auctions/:id
// @access  Private/Admin
const updateAuction = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    image1,
    image2,
    image3,
    image4,
    model,
    cnt,
    location,
  } = req.body

  const auction = await Auction.findById(req.params.id)

  if (auction) {
    auction.name = name
    auction.price = price
    auction.description = description
    auction.image = image
    auction.image1 = image1
    auction.image2 = image2
    auction.image3 = image3
    auction.image4 = image4

    auction.model = model
    auction.cnt = cnt
    auction.location = location
    const updatedAuction = await auction.save()
    res.json(updatedAuction)
  } else {
    res.status(404)
    throw new Error('Auction not found')
  }
})

// @desc    Create new review
// @route   AUCTION /api/auctions/:id/reviews
// @access  Private
const createAuctionReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const auction = await Auction.findById(req.params.id)

  if (auction) {
    const alreadyReviewed = auction.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Auction already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    auction.reviews.push(review)

    auction.numReviews = auction.reviews.length

    auction.rating =
      auction.reviews.reduce((acc, item) => item.rating + acc, 0) /
      auction.reviews.length

    await auction.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Auction not found')
  }
})

// @desc    Get top rated auctions
// @route   GET /api/auctions/top
// @access  Public
const getTopAuctions = asyncHandler(async (req, res) => {
  const limit = 3
  const auctions = await Auction.find({}).sort({ rating: -1 }).limit(limit)

  res.json(auctions)
})

const getMyAuctions = asyncHandler(async (req, res) => {
  const auctions = await Auction.find({ user: req.user._id })
  res.json(auctions)
})



export {
  getAuctions,
  getAuctionById,
  deleteAuction,
  createAuction,
  updateAuction,
  createAuctionReview,
  getTopAuctions,
  getMyAuctions,
}