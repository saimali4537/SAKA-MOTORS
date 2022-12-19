import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from "./Rating";
const HPost = ({ post }) => {
  
  return (
    <Card border="info" className='my-3 p-3 rounded' style={{ height: '18rem' }}>
      <Link to={`/posts/post/${post._id}`}>
        <Card.Img src={post.image[0]} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/posts/post/${post._id}`}>
          <Card.Title as='div' style={{ height: '4rem' }}>
            <strong>{post.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={post.rating}
            text={`${post.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>Rs.{post.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default HPost