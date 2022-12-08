import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listManagers, deleteManager } from '../../actions/managerActions'

const ManagerListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const managerList = useSelector((state) => state.managerList)
  const { loading, error, managers } = managerList

  const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin

  const managerDelete = useSelector((state) => state.managerDelete)
  const { success: successDelete } = managerDelete

  useEffect(() => {
    if (adminInfo && adminInfo.isAdmin) {
      dispatch(listManagers())
    } else {
      history.push('/admin')
    }
  }, [dispatch, history, successDelete, adminInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteManager(id))
    }
  }

  return (
    <div class="col main pt-5 mt-3">
    <><br/><br/>
      <h1>Managers</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>MANAGER</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {managers.map((manager) => (
                  <tr key={manager._id}>
                    <td>{manager._id}</td>
                    <td>{manager.name}</td>
                    <td>
                      <a href={`mailto:${manager.email}`}>{manager.email}</a>
                    </td>
                    <td>
                      {manager.isAdmin ? (
                        <i className='fas fa-check' style={{ color: 'green' }}></i>
                      ) : (
                          <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/manager/${manager._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(manager._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}<br/><br/>
    </></div>
  )
}

export default ManagerListScreen