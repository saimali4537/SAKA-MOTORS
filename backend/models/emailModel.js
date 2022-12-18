import mongoose from 'mongoose'


const emailSchema = mongoose.Schema(
  {
    email: String,
  },
  {
    timestamps: true,
  },
)

const Email = mongoose.model('Email', emailSchema)

export default Email