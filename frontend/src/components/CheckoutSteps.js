import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <br/><br/>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/store/logins'>
            <Nav.Link>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
            <Nav.Link disabled>Sign In</Nav.Link>
          )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/store/shipping'>
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
            <Nav.Link disabled>Shipping</Nav.Link>
          )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/store/payment'>
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
            <Nav.Link disabled>Payment</Nav.Link>
          )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/store/placeorder'>
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
            <Nav.Link disabled>Place Order</Nav.Link>
          )}
      </Nav.Item>
      <br/><br/>
    </Nav>
  )
}

export default CheckoutSteps