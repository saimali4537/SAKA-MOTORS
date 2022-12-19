import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listMyBids, deleteBid} from '../../actions/bidActions'
import { BID_CREATE_RESET } from '../../constants/bidConstants'

const BidListScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const bidListMy = useSelector((state) => state.bidListMy)
  const { loading, error, bids } = bidListMy

  const bidDelete = useSelector((state) => state.bidDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bidDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  
  
  useEffect(() => {
    dispatch({ type: BID_CREATE_RESET })

   
    if (!userInfo ) {
      history.push('/home/login')
    } else {
     dispatch(listMyBids(''))

    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteBid(id))
    }
  }
  const [disable, setDisable] = React.useState(false);

  return (
    <>
    <h1 style={{
        display: 'flex',
        justifyContent: 'center',
      }}>Bids on My Post</h1>
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
    </>
  )
}
export default BidListScreen