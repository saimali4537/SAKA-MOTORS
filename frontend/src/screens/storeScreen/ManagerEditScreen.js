import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { getManagerDetails, updateManager } from '../../actions/managerActions'
import { MANAGER_UPDATE_RESET } from '../../constants/managerConstants'

const ManagerEditScreen = ({ match, history }) => {
  const managerId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const managerDetails = useSelector((state) => state.managerDetails)
  const { loading, error, manager } = managerDetails

  const managerUpdate = useSelector((state) => state.managerUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = managerUpdate


  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: MANAGER_UPDATE_RESET })
      history.push('/admin/managerlist')
    } else {
      if (!manager || manager._id !== managerId) {
        dispatch(getManagerDetails(managerId))
      } else {
        setName(manager.name)
        setEmail(manager.email)
      }
    }
  }, [dispatch, history, managerId, manager, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateManager({ _id: managerId, name, email}))
  }

  return (
    <>
      <Link to='/admin/managerlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
      <br/><br/>
        <h1>Edit Manager</h1>
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

export default ManagerEditScreen