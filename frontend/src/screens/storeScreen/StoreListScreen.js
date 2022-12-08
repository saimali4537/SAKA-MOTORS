import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listStores, deleteStore, createStore } from '../../actions/storeActionsA'
import { STORE_CREATE_RESET } from '../../constants/storeConstants'

const StoreListScreen = ({ history, match }) => {

  const dispatch = useDispatch()

  const storeList = useSelector((state) => state.storeList)
  const { loading, error, stores } = storeList

  const storeDelete = useSelector((state) => state.storeDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = storeDelete

  const storeCreate = useSelector((state) => state.storeCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    store: createdStore,
  } = storeCreate

  const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin

  useEffect(() => {
    dispatch({ type: STORE_CREATE_RESET })

    if (!adminInfo || !adminInfo.isAdmin) {
      history.push('/admin')
    } if (successCreate) {
      history.push(`/admin/store/${createdStore._id}/edit`)
    } else {
      dispatch(listStores(''))
    }
  }, [
    dispatch,
    history,
    adminInfo,
    successDelete,
    successCreate,
    createdStore
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteStore(id))
    }
  }

  const createStoreHandler = () => {
    dispatch(createStore())
  }

  return (
    <div class="col main pt-5 mt-3">
    <><br/><br/>
      <Row className='align-items-center'>
        <Col>
          <h1>Stores</h1>
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
                    <th>CATEGORY</th>
                    <th>CONTACT</th>
                    <th>LOCATION</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {stores.map((store) => (
                    <tr key={store._id}>
                      <td>{store._id}</td>
                      <td>{store.name}</td>
                      <td>{store.description}</td>
                      <td>{store.category}</td>
                      <td>{store.cnt}</td>
                      <td>{store.location}</td>
                      <td>
                        <LinkContainer to={`/admin/store/${store._id}/edit`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(store._id)}
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

export default StoreListScreen