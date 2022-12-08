import mongoose from 'mongoose'


const bookSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    prot: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Prot',
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    requiretime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Book = mongoose.model('Book', bookSchema)

export default Book