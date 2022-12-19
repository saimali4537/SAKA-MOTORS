import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listMyAuctions, deleteAuction } from '../../actions/auctionActions'
import { AUCTION_CREATE_RESET } from '../../constants/auctionConstants'

const AuctionListScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const auctionListMy = useSelector((state) => state.auctionListMy)
  const { loading, error, auctions } = auctionListMy

  const auctionDelete = useSelector((state) => state.auctionDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = auctionDelete

  const auctionCreate = useSelector((state) => state.auctionCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    auction: createdAuction,
  } = auctionCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  
  
  useEffect(() => {
    dispatch({ type: AUCTION_CREATE_RESET })

   
    if (!userInfo ) {
      history.push('/home/login')
    } if (successCreate) {
    } else {
     dispatch(listMyAuctions(''))

    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdAuction
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteAuction(id))
    }
  }

  const createAuctionHandler = () => {
    history.push('/auction/aauction')

  }
  const [disable, setDisable] = React.useState(false);

  return (
    <><br/><br/>
      <Row className='align-items-center'>
        <Col>
          <h1>Auctions</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createAuctionHandler}  disabled={disable}>
            <i className='fas fa-plus'></i> Create Auction
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
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
                    <th>DESCRIPTION</th>
                    <th>PRICE</th>
                    <th>CONTACT</th>
                    <th>LOCATION</th>
                    <th></th>
                   

                  </tr>
                </thead>
                <tbody>
                  
                  {auctions.map((auction) =>(
                    <tr key={auction._id}>
                      <td>{auction._id}</td>
                      <td>{auction.name}</td>
                      <td>{auction.description}</td>
                      <td>{auction.price}</td>
                      <td>{auction.cnt}</td>
                      <td>{auction.location}</td> 
                      <td>{auction.user}</td>  

                                    
                      
                      
                     
                      <td>
                      
                        <LinkContainer to={`/auction/user/auction/${auction._id}/edit`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(auction._id)}
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
export default AuctionListScreen