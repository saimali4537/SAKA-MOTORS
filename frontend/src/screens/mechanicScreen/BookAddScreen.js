import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import {  updateBook} from '../../actions/bookActions'
import { BOOK_UPDATE_RESET } from '../../constants/bookConstants'

const BookEditScreen = ({ match, history }) => {
  const bookId = match.params.id

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [contact, setContact] = useState('')
  const [address, setAddress] = useState('')
  const [requiretime, setRequiretime] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const bookDetails = useSelector((state) => state.bookDetails)
  const { loading, error, book } = bookDetails

  const bookUpdate = useSelector((state) => state.bookUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = bookUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BOOK_UPDATE_RESET })
      history.push('/mechanic')
    } else {
        setName(book.name)
        setDescription(book.description)
        setContact(book.contact)
        setAddress(book.address)
        setRequiretime(book.requiretime)
      }
    }
  , [dispatch, history, bookId, book, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateBook({
        _id: bookId,
        name,
        description,
        contact,
        address,
        requiretime,
      })
    )
  }

  return (
    <><br/><br/>
      <Link to='/mechanic' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Book Mechanic Service Now</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='contact'>
                  <Form.Label>Contact</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter your contact number'
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='address'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter your Address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='requiredtime'>
                  <Form.Label>Need Time</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter time for Analyze'
                    value={requiretime}
                    onChange={(e) => setRequiretime(e.target.value)}
                  ></Form.Control>
                </Form.Group>


                <Button type='submit' variant='primary'>
                  Create It!
            </Button>
              </Form>
            )}<br/><br/><br/><br/>
      </FormContainer>
    </>
  )
}

export default BookEditScreen