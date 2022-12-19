import React from 'react'
import { Card } from 'react-bootstrap';
import Timer  from '../assets/Timer';
const Product = ({ auction }) => {
  return (
    <Card className='my-3 p-3 rounded'>
        <a href={`/auction/auctione/${auction._id}`}>
        <Card.Img src={auction.image[0]} variant='top' />
</a>
      <Card.Body>
      <a href={`/auction/auctione/${auction._id}`}>
          <Card.Title as='div'>
            <strong>{auction.name}</strong>
          </Card.Title>
          </a>

        <Card.Text as='div'>
        <strong><Timer duration={auction.timer*1000}/></strong>
        </Card.Text>

        <Card.Text as='h3'>Rs.{auction.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product