import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listBids, deleteBid} from '../../actions/bidActions'
import { BID_CREATE_RESET } from '../../constants/bidConstants'

const BidListScreenA = ({ history, match }) => {
  const dispatch = useDispatch()

  const bidList = useSelector((state) => state.bidList)
  const { loading, error, bids } = bidList

  const bidDelete = useSelector((state) => state.bidDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bidDelete

  const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin
  
  
  useEffect(() => {
    dispatch({ type: BID_CREATE_RESET })

   
    if (!adminInfo ) {
      history.push('/admin')
    } else {
     dispatch(listBids(''))

    }
  }, [
    dispatch,
    history,
    adminInfo,
    successDelete,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteBid(id))
    }
  }
  const [disable, setDisable] = React.useState(false);

  return (
    <div class="col main pt-5 mt-3">
    <>
    <h1>Bids on Posts</h1>
    <br/><br/>
     {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <>
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>AUCTION</th>
                    <th>CONTACT</th>
                    <th>BID VALUE</th>
                    <th></th>
                   

                  </tr>
                </thead>
                <tbody>
                  
                  {bids.map((bid) =>(
                    <tr key={bid._id}>
                      <td>{bid._id}</td>
                      <td>{bid.name}</td>
                      <td>{bid.auction}</td>
                      <td>{bid.cnt}</td>
                      <td>{bid.bide}</td>  

                                    
                      
                      
                     
                      <td>
                      
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(bid._id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr> 
                  ))}
                </tbody>
                
              </Table>
            </>
          )}<br/><br/><br/><br/>
    </></div>
  )
}
export default BidListScreenA