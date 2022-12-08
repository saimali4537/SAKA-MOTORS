import mongoose from 'mongoose'


const bidSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    auction: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Auction',
    },
    name: {
      type: String,
      required: true,
    },
    cnt: {
      type: String,
      required: true,
    },
    bide: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Bid = mongoose.model('Bid', bidSchema)

export default Bid