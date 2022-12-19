import Stripe from "stripe";
import dotenv from 'dotenv'
import asyncHandler from 'express-async-handler';
dotenv.config()
const stripe = Stripe(process.env.STRIPE_SECRET_KEY_MY);



const title=asyncHandler(async(req, res, next)=>{
  res.render('index',{title: 'Express'})
})

const paymentP=asyncHandler(async(req, res)=>{

  const totalamount = req.body.totalamount;
  const orderid= req.body.orderid
  const token= req.body.token;
  stripe.customers.create({
    description: orderid,
    email: token.email,
    source: token.id,
    
  })
.then(customer => {
  stripe.charges.create({
    amount: totalamount*100,
    currency: 'pkr',
    customer: customer.id,
    receipt_email:token.email,
  })
}).then(result => res.status(200).send(result))
.catch(error=> console.error(error))
  })

  export {
    title,
    paymentP,
  }