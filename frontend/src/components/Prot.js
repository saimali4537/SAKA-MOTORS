import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from "./Rating";

const Prot = ({ prot }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/mechanic/prot/${prot._id}`}>
        <Card.Img src={prot.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/mechanic/prot/${prot._id}`}>
          <Card.Title as='div'>
            <strong>{prot.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={prot.rating}
            text={`${prot.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>Rs.{prot.Avg}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Prot