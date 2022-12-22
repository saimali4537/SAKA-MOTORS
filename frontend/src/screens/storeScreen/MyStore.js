import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listMyStores, deleteStore, createStore1 } from '../../actions/storeActions'
import { STORE_CREATE_RESET } from '../../constants/storeConstants'

const MyStore = ({ history, match }) => {

  const dispatch = useDispatch()
  

  const storeListMy = useSelector((state) => state.storeListMy)
  const { loading, error, stores } = storeListMy

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

  const managerLogin = useSelector((state) => state.managerLogin)
  const { managerInfo } = managerLogin

  useEffect(() => {
    dispatch({ type: STORE_CREATE_RESET })

    if (!managerInfo || !managerInfo.isAdmin) {
      history.push('/store/loginsm')
    } if (successCreate) {
      history.push(`/store/manager/store/${createdStore._id}/edit`)
    } else {
      dispatch(listMyStores(''))
    }
  }, [
    dispatch,
    history,
    managerInfo,
    successDelete,
    successCreate,
    createdStore,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteStore(id))
    }
  }

  const createStoreHandler = () => {
    history.push('/store/storeca/storeadd')
  }

  return (
    <><br/><br/>
      <Row className='align-items-center'>
        <Col>
          <h1>My Store</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createStoreHandler}>
            <i className='fas fa-plus'></i> Create Store
          </Button>
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
                      <td>{store.location}</td>
                      <td>
                        <LinkContainer to={`/store/manager/store/${store._id}/edit`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
              
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

export default MyStore 