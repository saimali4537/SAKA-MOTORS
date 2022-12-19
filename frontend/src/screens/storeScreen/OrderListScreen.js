import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listMOrders } from '../../actions/orderActions'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderListM = useSelector((state) => state.orderListM)
  const { loading, error, orders } = orderListM

  const managerLogin = useSelector((state) => state.managerLogin)
  const { managerInfo } = managerLogin

  useEffect(() => {
    if (managerInfo && managerInfo.isAdmin) {
      dispatch(listMOrders())
    } else {
      history.push('/store/loginsm')
    }
  }, [dispatch, history, managerInfo])

  return (
    <><br/><br/>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.manager && order.manager.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>Rs.{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                          <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                          <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                    </td>
                    <td>
                      <LinkContainer to={`/store/manager/order/${order._id}`}>
                        <Button variant='light' className='btn-sm'>
                          Details
                    </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}<br/><br/>
    </>
  )
}

export default OrderListScreen