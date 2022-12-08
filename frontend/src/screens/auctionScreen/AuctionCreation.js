import React, { useEffect } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AUCTION_CREATE_RESET } from '../../constants/auctionConstants'

const AuctionCreation = ({ history, match }) => {

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const auctionCreate = useSelector((state) => state.auctionCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    auction: createdAuction,
  } = auctionCreate

  useEffect(() => {
    dispatch({ type: AUCTION_CREATE_RESET })

    if (!userInfo ) {
      history.push('/login')
    } if (successCreate) {
      history.push(`/auctions/${createdAuction._id}`)
    } else {
    }
  }, [
    history,
    userInfo,
    successCreate,
    createdAuction,
  ])

  const createAuctionHandler = () => {
    history.push(`/user/auctionlist`)

  }

  return (
    <><br/><br/>
      <Row className='align-items-center'>
        <Col>
          <h1>Auction Your Add Using Our Platform</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createAuctionHandler}>
            <i className='fas fa-plus'></i> Auction Add Now
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default AuctionCreation