import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { createProt } from '../../actions/protActions'
import { PROT_CREATE_RESET } from '../../constants/protConstants'

const ProtEditScreen = ({ match, history }) => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [Avg, setAvg] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [store, setStore] = useState('')
  const [cnt, setCnt] = useState('')

  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const protCreate = useSelector((state) => state.protCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = protCreate

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PROT_CREATE_RESET })
      history.push('/mechanic/protm')
    }
  }
  , [dispatch, history, successCreate])

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
      createProt({
        name,
        image,
        Avg,
        location,
        store,
        category,
        cnt,
        
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
      <Link to='/mechanic/protlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Your Profile Now</h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
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

                <Form.Group controlId='image'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter image url'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                  <Form.File
                    id='image-file'
                    label='Choose File'
                    custom
                    onChange={uploadFileHandler}
                  ></Form.File>
                  {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId='Avg'>
                  <Form.Label>Average Rate</Form.Label>
                  <Form.Control
                     type='number'
                     maxLength = "4" 
                     onInput={maxLengthCheck}
                    placeholder='Enter Average Rate'
                    value={Avg}
                    onChange={(e) => setAvg(e.target.value)}
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

                <Form.Group controlId='cnt'>
                  <Form.Label>Contact No</Form.Label>
                  <Form.Control
                    type='number'
                    maxLength = "11" 
                    onInput={maxLengthCheck}
                    placeholder='Enter cnt'
                    value={cnt}
                    onChange={(e) => setCnt(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='location'>
                <Form.Label>Location</Form.Label>
                  <Form.Control
          as="select"
          value={location}
          onChange={e => {
            setLocation(e.target.value);
          }}
        >
           <option value="" disabled>Please Choose Location</option>
        <option value="Wah Cantt">Wah Cantt</option>
        <option value="Taxila">Taxila</option>
        <option value="Rawalpindi">Rawalpindi</option>
        </Form.Control>
                </Form.Group>

                <Form.Group controlId='store'>
                  <Form.Label>Store</Form.Label>
                  <Form.Control
                    type='text'
                    maxLength={15}
                    placeholder='Enter Store Name'
                    value={store}
                    onChange={(e) => setStore(e.target.value)}
                  ></Form.Control>
                </Form.Group>


                <Button type='submit' variant='primary'>
                  Create It
            </Button>
              </Form>
            <br/><br/><br/><br/>
      </FormContainer>
    </>
  )
}

export default ProtEditScreen