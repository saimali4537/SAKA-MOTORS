import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { createProduct } from '../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'

const ProductAddScreen = ({ match, history }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')

  const [store, setStore] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productCreate = useSelector((state) => state.productCreate )
  const {
    loading: loadingCreate ,
    error: errorCreate ,
    success: successCreate ,
  } = productCreate 

  useEffect(() => {
    if (successCreate ) {
      dispatch({ type: PRODUCT_CREATE_RESET })
      history.push('/store/manager/productlist')
    } 
  }, [dispatch, history,  successCreate ])

  

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
      
     const{data}=await axios.post('/api/upload', formData, config)
     setImage(data)
     setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProduct({
        name,
        price,
        image,
        store,
        category,
        description,
        countInStock,
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
      <Link to='/store/manager/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Add Your Products</h1>
        {loadingCreate  && <Loader />}
        {errorCreate  && <Message variant='danger'>{errorCreate }</Message>}
        
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='name'
                    maxLength={15}
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='price'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type='number'
                    maxLength = "6" 
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

                <Form.Group controlId='store'>
                  <Form.Label>Store</Form.Label>
                  <Form.Control
                    type='text'
                    maxLength={15}
                    placeholder='Enter store'
                    value={store}
                    onChange={(e) => setStore(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock'>
                  <Form.Label>Count In Stock</Form.Label>
                  <Form.Control
                   type='number'
                   maxLength = "6" 
                   onInput={maxLengthCheck}
                    placeholder='Enter countInStock'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                  <Form.Control
          as="select"
          value={category}
          onChange={e => {
            setCategory(e.target.value);
          }}
        >
           <option value="" disabled>Please Choose Category</option>
        <option value="Car Mechanic">Car Mechanic</option>
        <option value="Electrician">Electrician</option>
        <option value="Painter">Painter</option>
        </Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type='text'
                    maxLength={50}
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                  Create it
            </Button>
              </Form>
            <br/><br/><br/><br/>
      </FormContainer>
    </>
  )
}

export default ProductAddScreen