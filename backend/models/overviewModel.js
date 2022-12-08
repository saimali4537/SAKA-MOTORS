import mongoose from 'mongoose'


const overviewSchema = mongoose.Schema(
  {
    users: {
      type: Number,
      required: true,
      default: 0,
    },
    managers: {
      type: Number,
      required: true,
      default: 0,
    },
    mechanics: {
      type: Number,
      required: true,
      default: 0,
    },
    posts: {
      type: Number,
      required: true,
      default: 0,
    },
    products: {
      type: Number,
      required: true,
      default: 0,
    },
    orders: {
      type: Number,
      required: true,
      default: 0,
    },
    books: {
      type: Number,
      required: true,
      default: 0,
    },
    auctions: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Overview = mongoose.model('Overview', overviewSchema)

export default Overview