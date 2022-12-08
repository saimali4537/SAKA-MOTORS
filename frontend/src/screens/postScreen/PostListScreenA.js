import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listPosts, deletePost } from '../../actions/postActions'

const PostListScreenA = ({ history }) => {

  const dispatch = useDispatch()

  const postList = useSelector((state) => state.postList)
  const { loading, error, posts } = postList

  const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin

  const postDelete = useSelector((state) => state.postDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = postDelete


  useEffect(() => {
    if (!adminInfo ) {
      history.push('/admin')
    }else {
      dispatch(listPosts())
    }
  }, [
    dispatch,
    history,
    adminInfo,
    successDelete,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deletePost(id))
    }
  }

  return (
    <div class="col main pt-5 mt-3">
    <><br/><br/>
      <Row className='align-items-center'>
        <Col>
          <h1>Posts</h1>
        </Col>
        
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <>
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>DESCRIPTION</th>
                    <th>PRICE</th>
                    <th>CONTACT</th>
                    <th>LOCATION</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post._id}>
                      <td>{post._id}</td>
                      <td>{post.name}</td>
                      <td>{post.description}</td>
                      <td>{post.price}</td>
                      <td>{post.cnt}</td>
                      <td>{post.location}</td>
                      <td>
                        <LinkContainer to={`/admin/post/${post._id}/edit`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(post._id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}<br/><br/><br/><br/>
    </></div>
  )
}

export default PostListScreenA