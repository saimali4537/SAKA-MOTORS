import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { login } from '../../actions/managerActions'

const LoginScreenS = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const managerLogin = useSelector((state) => state.managerLogin)
  const { loading, error, managerInfo } = managerLogin

  const redirect = location.search ? location.search.split('=')[2] : '/store'

  useEffect(() => {
    if (managerInfo) {
      history.push(redirect)
    }
  }, [history, managerInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <br/><br/>
      <h1>Manager Sign In</h1>
     
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
      <Col>
          Forgot Password?{' '}
          <Link to={redirect ? `/storem/forgets?redirect=${redirect}` : '/store/forgetsm'}>
            Forget
          </Link>
        </Col>
      </Row>

      <Row className='py-3'>
        <Col>
          Become Seller?{' '}
          <Link to={redirect ? `/store/registersm?redirect=${redirect}` : '/store/registersm'}>
            Register
          </Link>
        </Col>
      </Row>
      <br/><br/>
    </FormContainer>
  )
}

export default LoginScreenS