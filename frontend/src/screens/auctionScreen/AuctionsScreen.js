import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Card, Button, Form, InputGroup, Table } from 'react-bootstrap'
import Rating from '../../components/Rating'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import {
  listAuctionDetails,
  createAuctionReview,
} from '../../actions/auctionActions'
import { AUCTION_CREATE_REVIEW_RESET } from '../../constants/auctionConstants'
import Carousel from 'react-bootstrap/Carousel';
import {listTopBids} from '../../actions/bidActions'
import Timer  from '../../assets/Timer';

const AuctionsScreen = ({ history, match }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const auctionDetails = useSelector((state) => state.auctionDetails)
  const { loading, error, auction } = auctionDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  const bidDetails = useSelector((state) => state.bidDetails)
  const {  bid } = bidDetails
 
  const bidTopRated = useSelector((state) => state.bidTopRated)
  const { bids, pagep, pages } = bidTopRated

  const auctionUpdate = useSelector((state) => state.auctionUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = auctionUpdate

  const auctionReviewCreate = useSelector((state) => state.auctionReviewCreate)
  const {
    success: successAuctionReview,
    loading: loadingAuctionReview,
    error: errorAuctionReview,
  } = auctionReviewCreate

  const bidCreate = useSelector((state) => state.bidCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    bid: createdBid,
  } = bidCreate
  useEffect(() => {
    dispatch(listTopBids(`${match.params.id}`))
   if(userInfo){
    if(userInfo._id===auction.user){
      setDisable(true)
    }
    }else{
      setDisable(false)
    }
    if (successAuctionReview) {
      setRating(0)
      setComment('')
    }
    if (!auction._id || auction._id !== match.params.id) {
      dispatch(listAuctionDetails(match.params.id))
      dispatch({ type: AUCTION_CREATE_REVIEW_RESET })
    }
  }, [dispatch,match, successAuctionReview, auction._id, createdBid, successCreate,auction, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createAuctionReview(match.params.id, {
        rating,
        comment,
      })
    )
  }
  const bidHandler = () => {
    history.push(`/auction/bidc/${match.params.id}`)

  }
  const [disable, setDisable] = React.useState(false);

  const getTimeRemaining = (timer) => {
    return ;
  };



  return (
    <>
      <Link className='btn btn-light my-3' to='/auction'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <>
              <Meta title={auction.name} />
              <Row>
                <Col md={6}>
                <Carousel variant="dark" className="main_slide">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={auction.image1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={auction.image2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={auction.image3}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
                </Col>
                <Col md={3}>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h3>{auction.name}</h3>
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                      <Rating
                        value={auction.rating}
                        text={`${auction.numReviews} reviews`}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Contact No: {auction.cnt}
                      </ListGroup.Item>
                    <ListGroup.Item>
                      Description: {auction.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={3}>
                  <Card>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>
                            <strong>Rs. {auction.price}</strong>
                          </Col>
                        </Row>
                        <Row>
                          <Col>Remaining Time:</Col>
                          <Col>
                            <strong><Timer duration={auction.timer*1000}/></strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      
                      <ListGroup.Item>
                        <Button
                          onClick={bidHandler}
                          className='btn-block'
                          type='button'
                          //disabled={prot.countInStock === 0}
                          disabled={disable}
                        >
                          Bid Now
                    </Button>
                      </ListGroup.Item>
                     
                      

                    </ListGroup>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <h2>Top Bids</h2>
                  <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME OF USER</th>
                    <th>CONTACT NO</th>
                    <th>BID AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {bids.map((bid, index) => (
                    <tr key={bid._id}>
                      <td>{index+1}</td>
                      <td>{bid.name}</td>
                      <td>{bid.cnt}</td>
                      <td>{bid.bide}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
                </Col>
              </Row>
            </>
          )}
    </>
  )
}

export default AuctionsScreen