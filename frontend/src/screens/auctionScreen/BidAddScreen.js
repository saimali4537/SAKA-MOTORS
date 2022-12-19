import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import {  createBid} from '../../actions/bidActions'
import { BID_UPDATE_RESET } from '../../constants/bidConstants'

const BidAddScreen = ({ match, history }) => {
  const bidId = match.params.id

  const [name, setName] = useState('')
  const [cnt, setCnt] = useState('')
  const [bide, setBide] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const bidDetails = useSelector((state) => state.bidDetails)
  const { loading, error, bid } = bidDetails

  const bidCreate= useSelector((state) => state.bidCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = bidCreate

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: BID_UPDATE_RESET })
      history.push('/auction')
    } else {
        setName(bid.name)
        setCnt(bid.cnt)
        setBide(bid.bide)
      }
    }
  , [dispatch, history, bidId, bid, successCreate])

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
      createBid(`${match.params.id}`,{
        name,
        cnt,
        bide,
      })
    )
  }

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
     object.target.value = object.target.value.slice(0, object.target.maxLength)
      }
    }

  return (
    <><br/><br/>
      <Link to='/auction/bidc/:id' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Bid Now</h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
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
                    maxLength={15}
                    placeholder='Enter your name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='cnt'>
                  <Form.Label>Contact No</Form.Label>
                  <Form.Control
                    type='number'
                    maxLength = "11" 
                    onInput={maxLengthCheck}
                    placeholder='Enter your Contact No'
                    value={cnt}
                    onChange={(e) => setCnt(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='bide'>
                  <Form.Label>Bid Value</Form.Label>
                  <Form.Control
                    type='number'
                    maxLength = "11" 
                    onInput={maxLengthCheck}
                    placeholder='Enter your Bid Amount'
                    value={bide}
                    onChange={(e) => setBide(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                  Bid It!
            </Button>
              </Form>
            )}<br/><br/><br/><br/>
      </FormContainer>
    </>
  )
}

export default BidAddScreen