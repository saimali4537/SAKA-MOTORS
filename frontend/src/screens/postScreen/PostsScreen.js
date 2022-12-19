import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Post from '../../components/Post'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import { listPosts } from '../../actions/postActions';
import ProductCarousel from '../../components/ProductCarousel'

const PostsScreen = ({ match }) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch();

  const postList = useSelector(state => state.postList);
  const { loading, error, posts } = postList;

  useEffect(() => {
    dispatch(listPosts(keyword))
  }, [dispatch, keyword]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <></>
      ) : (
          <Link to='/home' className='btn btn-light'>
            Go Back
          </Link>
        )
      }
      { loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <>
              <Row>
                {posts.map((post) => (
                  <Col key={post._id} sm={12} md={6} lg={4} xl={3}>
                    <Post post={post} />
                  </Col>
                ))}
              </Row>
            </>
          )}
    </>
  )
}

export default PostsScreen