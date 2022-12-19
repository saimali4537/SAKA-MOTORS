import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listMBooks, deleteBookU, createBook } from '../../actions/bookActions'
import { BOOK_CREATE_RESET } from '../../constants/bookConstants'

const BookListScreen = ({ history, match }) => {

  const dispatch = useDispatch()

  const bookListM = useSelector((state) => state.bookListM)
  const { loading, error, books } = bookListM

  const bookDelete = useSelector((state) => state.bookDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bookDelete

  const bookCreate = useSelector((state) => state.bookCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    book: createdBook,
  } = bookCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: BOOK_CREATE_RESET })

    if (!userInfo ) {
      history.push('/mechanic/loginm')
    } if (successCreate) {
      history.push(`/mechanic/book/${createdBook._id}/edit`)
    } else {
      dispatch(listMBooks(''))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdBook,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteBookU(id))
    }
  }

  const createBookHandler = () => {
    dispatch(createBook())
  }

  return (
    <><br/><br/>
      <Row className='align-items-center'>
        <Col>
          <h1>Bookings</h1>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
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
                      <LinkContainer to={`/mechanic/book/${book._id}/edit`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
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
    </>
  )
}

export default BookListScreen