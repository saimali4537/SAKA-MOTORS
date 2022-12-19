import asyncHandler from 'express-async-handler';
import Prot from '../models/protModel.js';
import Book from '../models/bookModel.js';

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
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

  const count = await Book.countDocuments({ ...keyword })
  const books = await Book.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ books, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    res.json(book);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
})

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)

  if (book) {
    await book.remove()
    res.json({ message: 'Book removed' })
  } else {
    res.status(404)
    throw new Error('Book not found')
  }
})

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
const createBook = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    contact,
    address,
    requiretime,
  } = req.body
  const book = new Book({
    user: req.user._id,
    prot: req.params.id,
    name: name,
    description: description,
    contact: contact,
    address: address,
    requiretime: requiretime,
  
    
  })

  const createdBook = await book.save()
  res.status(201).json(createdBook)
})

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    contact,
    address,
    requiretime,
  } = req.body

  const book = await Book.findById(req.params.id)

  if (book) {
    book.name = name
    book.description = description
    book.contact = contact
    book.address = address
    book.requiretime = requiretime

    const updatedBook = await book.save()
    res.json(updatedBook)
  } else {
    res.status(404)
    throw new Error('Book not found')
  }
})

// @desc    Get top rated books
// @route   GET /api/books/top
// @access  Public
const getTopBooks = asyncHandler(async (req, res) => {
  const limit = 3
  const books = await Book.find({}).sort({ rating: -1 }).limit(limit)

  res.json(books)
})

const getMyBooks = asyncHandler(async (req, res) => {
  const prot = await Prot.find({user: req.mechanic._id})
  const books = await Book.find({ prot: prot})
  res.json(books)
})

const getMBooks = asyncHandler(async (req, res) => {
  const books= await Book.find({user: req.user._id})
  res.json(books)
})

const getSBooks = asyncHandler(async (req, res) => {
  const prot = await Prot.findById(req.mechanic._id)
  const books = await Book.find({ user: prot.user._id})
  res.json(books)
})


export {
  getBooks,
  getBookById,
  deleteBook,
  createBook,
  updateBook,
  getTopBooks,
  getMyBooks,
  getSBooks,
  getMBooks
}