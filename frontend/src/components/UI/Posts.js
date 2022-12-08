import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Post from '../HPost'
import { listTopPosts } from '../../actions/postActions';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const Posts= ({ match }) => {

  const dispatch = useDispatch();

  const postTopRated = useSelector(state => state.postTopRated);
  const { loading, error, posts } = postTopRated;

  useEffect(() => {
    dispatch(listTopPosts(''))
  }, [dispatch]);

  return (
            <><Row>
                {posts.map((post) => (
                  <Col key={post._id} sm={12} md={6} lg={3} xl={3}>
                    <Post post={post} />
                  </Col>
                ))}
             
             </Row>
    </>
  )
}

export default Posts