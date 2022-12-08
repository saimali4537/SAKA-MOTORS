import asyncHandler from 'express-async-handler';
import Overview from '../models/overviewModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import Post from '../models/postModel.js';
import Order from '../models/orderModel.js';
import Manager from '../models/managerModel.js';
import Mechanic from '../models/mechanicModel.js';
import Book from '../models/bookModel.js';
import Auction from '../models/auctionModel.js';






// @desc    Fetch all overviews
// @route   GET /api/overviews
// @access  Public
const getOverviews = asyncHandler(async (req, res) => {
  const pageSize = 1000
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
      users: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {}

  const count = await Overview.countDocuments({ ...keyword })
  const overviews = await Overview.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ overviews, page, pages: Math.ceil(count / pageSize) })
})
// @desc    Create a overview
// @route   POST /api/overviews
// @access  Private/Admin
const createOverview = asyncHandler(async (req, res) => {
  const overview = new Overview({
    users: 0,
    managers: 0,
    mechanics: 0,
    posts: 0,
    products: 0,
    orders: 0,
    books: 0,
    auctions: 0,


  })
    const createdOverview = await overview.save()
    res.status(201).json(createdOverview)
 })

// @desc    Update a overview
// @route   PUT /api/overviews/:id
// @access  Private/Admin
const updateOverview = asyncHandler(async (req, res) => {
  const user= await User.count({})
  const product= await Product.count({})
  const post= await Post.count({})
  const order= await Order.count({})
  const book= await Book.count({})
  const manager= await Manager.count({})
  const mechanic= await Mechanic.count({})
  const auction= await Auction.count({})


  const overview = await Overview.findById(req.params.id)

  if (overview) {
    overview.users = user
    overview.products = product
    overview.posts = post
    overview.orders = order
    overview.bookss = book
    overview.managers = manager
    overview.mechanics = mechanic
    overview.auctions = auction



    const updatedOverview = await overview.save()
    res.json(updatedOverview)
  } else {
    res.status(404)
    throw new Error('Overview not found')
  }
})

export {
  getOverviews,
  createOverview,
  updateOverview,
}