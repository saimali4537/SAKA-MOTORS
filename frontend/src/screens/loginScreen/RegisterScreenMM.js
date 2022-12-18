import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { register } from '../../actions/mechanicActions'
import { send } from '../../actions/mechanicActions'
import { auth } from '../../actions/mechanicActions'

const RegisterScreenMM = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [disable, setDisable] = React.useState(true);
  const [disablel, setDisablel] = React.useState(false);
  const [message, setMessage] = useState(null)
  const isAdmin = new Boolean(true);

  const dispatch = useDispatch()

  const mechanicLogin = useSelector((state) => state.mechanicLogin)
  const { loading, error, mechanicInfo } = mechanicLogin

  const redirect = location.search ? location.search.split('=')[2] : '/protcc'

  useEffect(() => {
    if (mechanicInfo) {
      dispatch(register(name, email, password, isAdmin))
      history.push(redirect)
    }
  }, [history, mechanicInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      setDisable(false)
      setDisablel(true)
      dispatch(send(email))
    }
  }
  const submitHandlera = (e) => {
    e.preventDefault()
      dispatch(auth(otp, email))
  }

  return (
    <FormContainer>
      <br/><br/>
      <h1>Mechanic Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form>

        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={disablel}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={disablel}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
  <Form.Label>Password</Form.Label>
  <Form.Control
   rules={["minLength","specialChar",
           "number","capital","match"]}
   minLength={8}
    type='password'
    placeholder='Enter password'
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    disabled={disablel}
  ></Form.Control>
</Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={disablel}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='otp'>
          <Form.Label>Otp</Form.Label>
          <Form.Control
            type='otp'
            placeholder='Please Enter Your Otp'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={disable}
            
          >
          </Form.Control>
         
        </Form.Group>
        <Form.Group>
        <Button type='submit' variant='primary' disabled={disable} onClick={submitHandlera}>
          Verify
        </Button>
        </Form.Group>
        <Button type='submit' variant='primary' disabled={disablel} onClick={submitHandler}>
          Register
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Register as User?{' '}
          <Link to={redirect ? `/registerM?redirect=${redirect}` : '/registerm'}>
            Register
          </Link>
        </Col>
      </Row>
      <br/><br/>
    </FormContainer>
  )
}

export default RegisterScreenMM