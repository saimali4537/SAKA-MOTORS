import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { listMechanicDetails, updateMechanic } from '../../actions/mechanicActionsA'
import { MECHANIC_UPDATE_RESET } from '../../constants/mechanicConstants'

const MechanicEditScreen = ({ match, history }) => {
  const mechanicId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const mechanicDetails = useSelector((state) => state.mechanicDetails)
  const { loading, error, mechanic } = mechanicDetails

  const mechanicUpdate = useSelector((state) => state.mechanicUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = mechanicUpdate


  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: MECHANIC_UPDATE_RESET })
      history.push('/admin/mechaniclist')
    } else {
      if (!mechanic || mechanic._id !== mechanicId) {
        dispatch(listMechanicDetails(mechanicId))
      } else {
        setName(mechanic.name)
        setEmail(mechanic.email)
      }
    }
  }, [dispatch, history, mechanicId, mechanic, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateMechanic({ _id: mechanicId, name, email}))
  }

  return (
    <>
      <Link to='/admin/mechaniclist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
      <br/><br/>
        <h1>Edit Mechanic</h1>
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

                <Form.Group controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                

                <Button type='submit' variant='primary'>
                  Update
            </Button>
              </Form>
            )}<br/><br/>
      </FormContainer>
    </>
  )
}

export default MechanicEditScreen