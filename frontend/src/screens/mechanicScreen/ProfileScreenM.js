import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { getMechanicDetails, updateMechanicProfile } from '../../actions/mechanicActions'
import { listMyOrders } from '../../actions/orderActions'
import { MECHANIC_UPDATE_PROFILE_RESET } from '../../constants/mechanicConstants'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const mechanicDetails = useSelector((state) => state.mechanicDetails)
  const { loading, error, mechanic } = mechanicDetails

  const mechanicLogin = useSelector((state) => state.mechanicLogin)
  const { mechanicInfo } = mechanicLogin

  const mechanicUpdateProfile = useSelector((state) => state.mechanicUpdateProfile)
  const { success } = mechanicUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!mechanicInfo) {
      history.push('/mechanic/loginm')
    } else {
      if (!mechanic || !mechanic.name || success) {
        dispatch({ type: MECHANIC_UPDATE_PROFILE_RESET })
        dispatch(getMechanicDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(mechanic.name)
        setEmail(mechanic.email)
      }
    }
  }, [dispatch, history, mechanicInfo, mechanic, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateMechanicProfile({ id: mechanic._id, name, email, password }))
    }
  }

  return (
    <Row><br/><br/>
      <Col md={3}>
        <h2>Mechanic profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {/* {error && <Message variant='danger'>{error}</Message>} */}
        {success && <Message variant='success'>Profile Updated</Message>}
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

                <Form.Group controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                  Update
        </Button>
              </Form>
            )}
      </Col>

     <br/><br/>
    </Row>
  )
}

export default ProfileScreen