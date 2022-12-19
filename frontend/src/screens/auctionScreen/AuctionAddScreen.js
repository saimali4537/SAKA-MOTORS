import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import {createAuction } from '../../actions/auctionActions'
import { AUCTION_UPDATE_RESET } from '../../constants/auctionConstants'

const AuctionEditScreen = ({ match, history }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState([])
  const [image1, setImage1] = useState([])
  const [image2, setImage2] = useState([])
  const [image3, setImage3] = useState([])
  const [image4, setImage4] = useState([])

  const [model, setModel] = useState('')
  const [cnt, setCnt] = useState('')
  const [location, setlocation] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const auctionDetails = useSelector((state) => state.auctionDetails)
  const { loading, error, auction } = auctionDetails

  const auctionCreate = useSelector((state) => state.auctionCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = auctionCreate

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: AUCTION_UPDATE_RESET })
      history.push('/auction')
    } else {
        setName(auction.name)
        setPrice(auction.price)
        setImage(auction.image)
        setImage1(auction.image1)
        setImage2(auction.image2)
        setImage3(auction.image3)
        setImage4(auction.image4)
        setModel(auction.model)
        setCnt(auction.cnt)
        setlocation(auction.location)
        setDescription(auction.description)
    }
  }, [dispatch, history, auction, successCreate])

  

  const uploadFileHandler = async (e) => {
   //const file = e.target.files[0]
   const formData = new FormData()
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('image', e.target.files[i]);
    }
    //formData.append('image', e.target.files[0]);
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      
     const{data}=await axios.post('/api/uploadm', formData, config)
     var temp=new Array()
     temp=data.split(",")
     temp=temp.map(i=> '/'+i)
     setImage(temp)
     setImage1(temp[0])
     setImage2(temp[1])
     setImage3(temp[2])
     setImage4(temp[3])

      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createAuction({
        name,
        price,
        image,
        image1,
        image2,
        image3,
        image4,
        model,
        cnt,
        description,
        location,
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
      <Link to='/auction/user/auctionlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Add Your Auction</h1>
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
          maxLength={15}
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='price'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type='number'
                    maxLength = "11" 
                    onInput={maxLengthCheck}
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter image url'
                    value={image}
                    multiple
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                  <Form.File
                    id='image-file'
                    label='Choose File'
                    multiple
                    onChange={uploadFileHandler}
                  ></Form.File>
                  {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId='model'>
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                  maxLength={15}
                    type='text'
                    placeholder='Enter model'
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='location'>
                  <Form.Label>Location</Form.Label>
                  <Form.Control
          as="select"
          value={location}
          onChange={e => {
            setlocation(e.target.value);
          }}
        >
           <option value="" disabled>Please Choose Location</option>
        <option value="Wah Cantt">Wah Cantt</option>
        <option value="Taxila">Taxila</option>
        <option value="Rawalpindi">Rawalpindi</option>
        </Form.Control>
                </Form.Group>

                <Form.Group controlId='cnt'>
                  <Form.Label>Contact No</Form.Label>
                  <Form.Control
                    type='number'
                    maxLength = "11" 
                    onInput={maxLengthCheck}
                    placeholder='Enter Contact No.'
                    value={cnt}
                    onChange={(e) => setCnt(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                  maxLength={50}
                    type='text'
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                  Create Your Auction
            </Button>
              </Form>
            )}<br/><br/><br/><br/>
      </FormContainer>
    </>
  )
}

export default AuctionEditScreen