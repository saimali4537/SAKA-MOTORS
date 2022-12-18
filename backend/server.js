import path from 'path'
import express from 'express'
import session from 'express-session';
import flash from 'connect-flash';
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import connectDB from './config/db.js'
import cors from 'cors'

import productRoutes from './routes/productRoutes.js'
import productRoutesA from './routes/productRoutesA.js'
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import managerRoutes from './routes/managerRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import storeRoutes from './routes/storeRoutes.js'
import storeRoutesA from './routes/storeRoutesA.js'
import protRoutes from './routes/protRoutes.js'
import protRoutesA from './routes/protRoutesA.js'
import uploadRoutes from './routes/uploadRoutes.js'
import uploadRoutesM from './routes/uploadRoutesM.js'
import mechanicRoutes from './routes/mechanicRoutes.js'
import mechanicRoutesA from './routes/mechanicRoutesA.js'
import bookRoutes from './routes/bookRoutes.js'
import bookRoutesA from './routes/bookRoutesA.js'
import postRoutes from './routes/postRoutes.js'
import auctionRoutes from './routes/auctionRoutes.js'
import postRoutesA from './routes/postRoutesA.js'
import bidRoutes from './routes/bidRoutes.js'
import overviewRoutes from './routes/overviewRoutes.js'
import paymentRoutes from './routes/payment.js'
import emailRoutes from './routes/emailRoutes.js'





dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(cors())


app.use(express.json())

app.use('/api/products/', productRoutes)
app.use('/api/aproducts/', productRoutesA)
app.use('/api/users/', userRoutes)
app.use('/api/admins/', adminRoutes)
app.use('/api/managers/', managerRoutes)
app.use('/api/orders/', orderRoutes)
app.use('/api/stores/', storeRoutes)
app.use('/api/astores/', storeRoutesA)
app.use('/api/prots/', protRoutes)
app.use('/api/aprots/', protRoutesA)
app.use('/api/mechanics/', mechanicRoutes)
app.use('/api/amechanics/', mechanicRoutesA)
app.use('/api/books/', bookRoutes)
app.use('/api/abooks/', bookRoutesA)
app.use('/api/upload', uploadRoutes)
app.use('/api/uploadm', uploadRoutesM)
app.use('/api/posts/', postRoutes)
app.use('/api/auctions/', auctionRoutes)
app.use('/api/bids/', bidRoutes)
app.use('/api/aposts/', postRoutesA)
app.use('/api/overviews/', overviewRoutes)
app.use('/api/pay/', paymentRoutes)
app.use('/api/email/', emailRoutes)



 



app.use(session({
  secret:'sakamotors',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());


app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))