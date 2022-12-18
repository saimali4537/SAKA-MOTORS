import mongoose from 'mongoose'


const otpSchema = mongoose.Schema(
  {
    email: String,
    code:String,
    expireIn:Number,
    
  },
  {
    timestamps: true,
  },
)
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60})


const Otp = mongoose.model('Otp', otpSchema)

export default Otp