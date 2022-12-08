import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { listProtDetails, updateProt, createProt } from '../../actions/protActionsA'
import { PROT_UPDATE_RESET } from '../../constants/protConstants'

const ProtEditScreen = ({ match, history }) => {
  const protId = match.params.id

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [Avg, setAvg] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [store, setStore] = useState('')
  const [cnt, setCnt] = useState('')

  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const protDetails = useSelector((state) => state.protDetails)
  const { loading, error, prot } = protDetails

  const protUpdate = useSelector((state) => state.protUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = protUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PROT_UPDATE_RESET })
      history.push('/admin/protlist')
    } else {
      if (!prot.name || prot._id !== protId) {
        dispatch(listProtDetails(protId))
      }else {
        setName(prot.name)
        setImage(prot.image)
        setAvg(prot.Avg)
        setCategory(prot.category)
        setCnt(prot.cnt)
        setLocation(prot.location)
        setStore(prot.store)
      }
    }
  }
  , [dispatch, history, protId, prot, successUpdate])

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
      updateProt({
        _id: protId,
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

  return (
    <><br/><br/>
      <Link to='/admin/protlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Prot</h1>
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
                    type='text'
                    placeholder='Enter Average Rate'
                    value={Avg}
                    onChange={(e) => setAvg(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='cnt'>
                  <Form.Label>Contact No</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter cnt'
                    value={cnt}
                    onChange={(e) => setCnt(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='location'>
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter location'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='store'>
                  <Form.Label>Store</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Store Name'
                    value={store}
                    onChange={(e) => setStore(e.target.value)}
                  ></Form.Control>
                </Form.Group>


                <Button type='submit' variant='primary'>
                  Update
            </Button>
              </Form>
            )}<br/><br/><br/><br/>
      </FormContainer>
    </>
  )
}

export default ProtEditScreen