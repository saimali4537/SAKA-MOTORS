import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <br/><br/>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/mechanic/loginm'>
            <Nav.Link>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
            <Nav.Link disabled>Sign In</Nav.Link>
          )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/mechanic/shipping'>
            <Nav.Link>Address</Nav.Link>
          </LinkContainer>
        ) : (
            <Nav.Link disabled>Address</Nav.Link>
          )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/mechanic/payment'>
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
            <Nav.Link disabled>Payment</Nav.Link>
          )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/mechanic/placeorder'>
            <Nav.Link>Book</Nav.Link>
          </LinkContainer>
        ) : (
            <Nav.Link disabled>Book</Nav.Link>
          )}
      </Nav.Item>
      <br/><br/>
    </Nav>
  )
}

export default CheckoutSteps