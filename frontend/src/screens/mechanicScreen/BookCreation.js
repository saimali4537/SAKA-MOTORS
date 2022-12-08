import React, { useEffect } from 'react'
import {  Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {  createBook } from '../../actions/bookActions'
import { BOOK_CREATE_RESET } from '../../constants/bookConstants'

const BookCreation = ({ history, match }) => {

  const dispatch = useDispatch()
  const bookCreate = useSelector((state) => state.bookCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    book: createdBook,
  } = bookCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: BOOK_CREATE_RESET })

    if (!userInfo ) {
      history.push('/login')
    } if (successCreate) {
      history.push(`/book/${createdBook._id}`)
    } else {
    }
  }, [
    history,
    userInfo,
    successCreate,
    createdBook,
  ])

  const createBookHandler = () => {
    dispatch(createBook(`${match.params.id}`))
  }

  return (
    <><br/><br/>
      <Row className='align-items-center'>
        <Col>
          <h1>Booking of Mechanic Using Our Platform</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createBookHandler}>
            <i className='fas fa-plus'></i> Book Mechanic Now
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default BookCreation