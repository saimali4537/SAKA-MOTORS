import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import Rating from './Rating';

const Store = ({ store }) => {
  return (
    <Card className='my p-2 fixed rounded h-100'>
      <Link to={`/store/storez/${store._id}`}>
        <Card.Img src={store.image} variant='top' className='h-6vw' />
      </Link>
      <Card.Body>
        <Link to={`/store/storez/${store._id}`}>
          <Card.Title as='div'>
            <strong>{store.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={store.rating}
            text={`${store.numReviews} reviews`}
            color='red'
          />
        </Card.Text>
        <Card.Text as='h6'>{store.location}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Store;
