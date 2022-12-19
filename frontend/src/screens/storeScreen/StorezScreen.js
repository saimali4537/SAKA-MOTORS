import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card,  Form } from 'react-bootstrap'
import Rating from '../../components/Rating'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import {
  listStoreDetails,
  createStoreReview,
} from '../../actions/storeActions'
import { STORE_CREATE_REVIEW_RESET } from '../../constants/storeConstants'

const StorezScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const storeDetails = useSelector((state) => state.storeDetails)
  const { loading, error, store } = storeDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const storeReviewCreate = useSelector((state) => state.storeReviewCreate)
  const {
    success: successStoreReview,
    loading: loadingStoreReview,
    error: errorStoreReview,
  } = storeReviewCreate

  useEffect(() => {
    if (successStoreReview) {
      setRating(0)
      setComment('')
    }
    if (!store._id || store._id !== match.params.id) {
      dispatch(listStoreDetails(match.params.id))
      dispatch({ type: STORE_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match, successStoreReview, store._id])

  const visitHandler = () => {
    history.push(`/store/sstores/${match.params.id}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createStoreReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    
    <><br/><br/>
      <Link className='btn btn-light my-3' to='/storeby'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <>
              <Meta title={store.name} />
              <Row>
                <Col md={6}>
                  <Image src={store.image} alt={store.name} fluid />
                </Col>
                <Col md={3}>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h3>{store.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating
                        value={store.rating}
                        text={`${store.numReviews} reviews`}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Description: {store.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={3}>
                  <Card>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <Row>
                          <Col>Catogory:</Col>
                          <Col>
                            <strong>{store.catogory}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Location:</Col>
                          <Col>
                            <strong>{store.location}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      
                      <ListGroup.Item>
                      <Row>
                          <Col>Contact No:</Col>
                          <Col>
                            <strong>{store.cnt}</strong>
                          </Col>
                        </Row>
                        
                      </ListGroup.Item>
                      <ListGroup.Item>
                      <Button
                          onClick={visitHandler}
                          className='btn-block'
                          type='button'
                        >
                          Visit Store
                    </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
              <Row>
              <Col md={6}>
              <h2>Reviews</h2>
              {store.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {store.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successStoreReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingStoreReview && <Loader />}
                  {errorStoreReview && (
                    <Message variant='danger'>{errorStoreReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingStoreReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/store/logins'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
              </Row>
            </>
          )}<br/><br/>
    </>
  )
}

export default StorezScreen