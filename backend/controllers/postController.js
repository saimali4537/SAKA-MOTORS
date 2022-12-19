import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';

// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
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

  const count = await Post.countDocuments({ ...keyword })
  const posts = await Post.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ posts, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
})

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (post) {
    await post.remove()
    res.json({ message: 'Post removed' })
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

// @desc    Create a post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = asyncHandler(async (req, res) => {
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
  const post = new Post({
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

  const createdPost = await post.save()
  res.status(201).json(createdPost)
})

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePost = asyncHandler(async (req, res) => {
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

  const post = await Post.findById(req.params.id)

  if (post) {
    post.name = name
    post.price = price
    post.description = description
    post.image = image
    post.image1 = image1
    post.image2 = image2
    post.image3 = image3
    post.image4 = image4

    post.model = model
    post.cnt = cnt
    post.location = location

    const updatedPost = await post.save()
    res.json(updatedPost)
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

// @desc    Create new review
// @route   POST /api/posts/:id/reviews
// @access  Private
const createPostReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const post = await Post.findById(req.params.id)

  if (post) {
    const alreadyReviewed = post.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Post already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    post.reviews.push(review)

    post.numReviews = post.reviews.length

    post.rating =
      post.reviews.reduce((acc, item) => item.rating + acc, 0) /
      post.reviews.length

    await post.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

// @desc    Get top rated posts
// @route   GET /api/posts/top
// @access  Public
const getTopPosts = asyncHandler(async (req, res) => {
  const limit = 4
  const posts = await Post.find({}).sort({ rating: -1 }).limit(limit)

  res.json(posts)
})

const getMyPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user._id })
  res.json(posts)
})



export {
  getPosts,
  getPostById,
  deletePost,
  createPost,
  updatePost,
  createPostReview,
  getTopPosts,
  getMyPosts,
}