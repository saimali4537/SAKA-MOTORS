import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { updateUserProfileP, logout1 } from '../../actions/managerActions'
import { sendf } from '../../actions/managerActions'
import { auth } from '../../actions/managerActions'


const ForgetScreenSM = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [disable, setDisable] = React.useState(true);
  const [disablel, setDisablel] = React.useState(false);
  const [disablef, setDisablef] = React.useState(true);



  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const managerLogin = useSelector((state) => state.managerLogin)
  const { loading, error, managerInfo } = managerLogin

  const redirect = location.search ? location.search.split('=')[2] : '/store/loginsm'

  useEffect(() => {
    
    if(managerInfo){
      setDisablef(false)
    }
  }, [history, managerInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
      setDisable(false)
      setDisablel(true)
      dispatch(sendf(email))

    
  }
  const submitHandlera = (e) => {
    e.preventDefault()
      dispatch(auth(otp, email))
      setDisable(true)
  }
  const submitHandlerp = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfileP(email, password ))
      dispatch(logout1())
      history.push(redirect)

    }
  }
  
  return (
    <FormContainer>
      <br/><br/>
      <h1>Forget Your Password</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form >

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
        <Form.Group>
        <Button type='submit' variant='primary' disabled={disablel} onClick={submitHandler}>
          Forget
        </Button>
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
            disabled={disablef}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={disablef}
          ></Form.Control>
          
        </Form.Group> 
        <Form.Group>
        <Button type='submit' variant='primary' disabled={disablef} onClick={submitHandlerp}>
         Set it
        </Button>
        </Form.Group>
        

        
      </Form>

      <Row className='py-3'>
        <Col>
          Have an account?{' '}
          <Link to={redirect ? `/store/loginsm?redirect=${redirect}` : '/store/loginsm'}>
            Login
          </Link>
        </Col>
      </Row><br/><br/>
    </FormContainer>
  )
}

export default ForgetScreenSM