import asyncHandler from 'express-async-handler';
import Store from '../models/storeModel.js';
import Product from '../models/productModel.js'


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getStores = asyncHandler(async (req, res) => {
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

  const count = await Store.countDocuments({ ...keyword })
  const stores = await Store.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ stores, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getStoreById = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);

  if (store) {
    res.json(store);
  } else {
    res.status(404);
    throw new Error('Store not found');
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteStore = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id)

  if (store) {
  const product = await Product.find({ user: store.user })
  const len=product.length
  for(var i=0;i<len;i++){
    const products = await Product.findById(product[i]._id)
  await products.remove()
  }
    await store.remove()
    res.json({ message: 'Store removed' })
  } else {
    res.status(404)
    throw new Error('Store not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createStore = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    description,
    category,
    cnt,
    location,
  } = req.body
  const store = new Store({
    name: name,
    image: image,
    user: req.manager._id,
    description: description,
    category: category,
    cnt: cnt,
    location: location,
    
  })

  const stores = await Store.find({ user: req.manager._id })
  if (stores.length===0) {
    const createdStore1 = await store.save()
    res.status(201).json(createdStore1)

  } else {
    res.status(404);
    throw new Error('Sorry, You can have only One Store At a Time');
  }
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateStore = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    description,
    category,
    cnt,
    location,
  } = req.body

  const store = await Store.findById(req.params.id)

  if (store) {
    store.name = name
    store.image = image
    store.description = description
    store.category = category
    store.location = location
    store.cnt=cnt

    const updatedStore = await store.save()
    res.json(updatedStore)
  } else {
    res.status(404)
    throw new Error('Store not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createStoreReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const store = await Store.findById(req.params.id)

  if (store) {
    const alreadyReviewed = store.reviews.find(
      (r) => r.admin.toString() === req.admin._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Store already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    store.reviews.push(review)

    store.numReviews = store.reviews.length

    store.rating =
      store.reviews.reduce((acc, item) => item.rating + acc, 0) /
      store.reviews.length

    await store.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Store not found')
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopStores = asyncHandler(async (req, res) => {
  const limit = 3
  const stores = await Store.find({}).sort({ rating: -1 }).limit(limit)

  res.json(stores)
})

const getMyStores = asyncHandler(async (req, res) => {
  const stores = await Store.find({ user: req.manager._id })
  res.json(stores)
})

export {
  getStores,
  getStoreById,
  deleteStore,
  createStore,
  updateStore,
  createStoreReview,
  getTopStores, 
  getMyStores
}