import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listAuctions, deleteAuction } from '../../actions/auctionActions'
import { AUCTION_CREATE_RESET } from '../../constants/auctionConstants'

const AuctionListScreenA = ({ history }) => {
  const dispatch = useDispatch()

  const auctionList = useSelector((state) => state.auctionList)
  const { loading, error, auctions, pagel, pages } = auctionList

  const auctionDetails = useSelector((state) => state.auctionDetails)
  const { auction } = auctionDetails

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

  const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin
  
  
  useEffect(() => {
    dispatch({ type: AUCTION_CREATE_RESET })

   
    if (!adminInfo ) {
      history.push('/admin')
    } if (successCreate) {
      history.push(`/auctions/${createdAuction._id}`)
    } else {
     dispatch(listAuctions(''))

    }
  }, [
    dispatch,
    history,
    adminInfo,
    auction,
    successDelete,
    successCreate,
    createdAuction,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteAuction(id))
    }
  }

  return (
    <div class="col main pt-5 mt-3">
    <><br/><br/>
      <Row className='align-items-center'>
        <Col>
          <h1>Auctions</h1>
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
                      <td>{auction.admin}</td>  

                                    
                      
                      
                     
                      <td>
                      
                        <LinkContainer to={`/admin/auction/${auction._id}/edit`}>
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
    </></div>
  )
}
export default AuctionListScreenA