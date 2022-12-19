import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../../components/Rating'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import {
  listProtDetails,
  createProtReview,
} from '../../actions/protActions'
import { PROT_CREATE_REVIEW_RESET } from '../../constants/protConstants'

const MechanicsView = ({ history, match }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  

  const dispatch = useDispatch()

  const protDetails = useSelector((state) => state.protDetails)
  const { loading, error, prot } = protDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const protReviewCreate = useSelector((state) => state.protReviewCreate)
  const {
    success: successProtReview,
    loading: loadingProtReview,
    error: errorProtReview,
  } = protReviewCreate

  useEffect(() => {
    if (successProtReview) {
      setRating(0)
      setComment('')
    }
    if (!prot._id || prot._id !== match.params.id) {
      dispatch(listProtDetails(match.params.id))
      dispatch({ type: PROT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match, successProtReview, prot._id])

  const bookHandler = () => {
    history.push(`/mechanic/bookc/${match.params.id}`)


  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProtReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/mechanic'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <>
              <Meta title={prot.name} />
              <Row>
                <Col md={6}>
                  <Image src={prot.image} alt={prot.name} fluid />
                </Col>
                <Col md={3}>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h3>{prot.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating
                        value={prot.rating}
                        text={`${prot.numReviews} reviews`}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>Store: {prot.store}</ListGroup.Item>
                    <ListGroup.Item>
                      Location: {prot.location}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={3}>
                  <Card>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <Row>
                          <Col>Avgerage Rate:</Col>
                          <Col>
                            <strong>Rs. {prot.Avg}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Contact No:</Col>
                          <Col>
                            {prot.cnt}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Button
                          onClick={bookHandler}
                          className='btn-block'
                          type='button'
                          disabled={prot.countInStock === 0}
                        >
                          Book Me
                    </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
              <Row>
              <Col md={6}>
              <h2>Reviews</h2>
              {prot.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {prot.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProtReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProtReview && <Loader />}
                  {errorProtReview && (
                    <Message variant='danger'>{errorProtReview}</Message>
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
                        disabled={loadingProtReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/mechanic/loginm'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
              </Row>
            </>
          )}
    </>
  )
}

export default MechanicsView