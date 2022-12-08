import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  getMOrders
} from '../controllers/orderController.js'
import { protectu, protect, manager, protecta, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protectu, addOrderItems).get(protecta, getOrders)
router.route('/myorders').get(protectu, getMyOrders)
router.route('/morders').get(protect, getMOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(updateOrderToPaid)
router.route('/:id/deliver').put(protect, manager, updateOrderToDelivered)

export default router