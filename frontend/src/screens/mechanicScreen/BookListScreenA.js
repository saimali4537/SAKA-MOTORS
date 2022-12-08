import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listBooks, deleteBook } from '../../actions/bookActionsA'

const BookListScreenA = ({ history, match }) => {

  const dispatch = useDispatch()

  const bookList = useSelector((state) => state.bookList)
  const { loading, error, books } = bookList

  const bookDelete = useSelector((state) => state.bookDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bookDelete

  const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin

  useEffect(() => {
    if (adminInfo && adminInfo.isAdmin) {
      dispatch(listBooks())
    } else {
      history.push('/admin')
    }
  }, [
    dispatch,
    history,
    adminInfo,
    successDelete,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteBook(id))
    }
  }


  return (
    <div class="col main pt-5 mt-3">
    <><br/><br/>
      <Row className='align-items-center'>
        <Col>
          <h1>Bookings</h1>
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
                    <th>CONTACT</th>
                    <th>ADDRESS</th>
                    <th>TIME TO VISIT</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book._id}>
                      <td>{book._id}</td>
                      <td>{book.name}</td>
                      <td>{book.description}</td>
                      <td>{book.contact}</td>
                      <td>{book.address}</td>
                      <td>{book.requiretime}</td>
                      <td>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(book._id)}
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

export default BookListScreenA