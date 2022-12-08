import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listMechanics, deleteMechanic } from '../../actions/mechanicActionsA'

const MechanicListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const mechanicList = useSelector((state) => state.mechanicList)
  const { loading, error, mechanics } = mechanicList

  const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin

  const mechanicDelete = useSelector((state) => state.mechanicDelete)
  const { success: successDelete } = mechanicDelete

  useEffect(() => {
    if (adminInfo && adminInfo.isAdmin) {
      dispatch(listMechanics())
    } else {
      history.push('/admin')
    }
  }, [dispatch, history, successDelete, adminInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteMechanic(id))
    }
  }

  return (
    <div class="col main pt-5 mt-3">
    <><br/><br/>
      <h1>Mechanics</h1>
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
                  <th>SIMPLE MECHANIC</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {mechanics.map((mechanic) => (
                  <tr key={mechanic._id}>
                    <td>{mechanic._id}</td>
                    <td>{mechanic.name}</td>
                    <td>
                      <a href={`mailto:${mechanic.email}`}>{mechanic.email}</a>
                    </td>
                    <td>
                      {mechanic ? (
                        <i className='fas fa-check' style={{ color: 'green' }}></i>
                      ) : (
                          <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/${mechanic._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(mechanic._id)}
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

export default MechanicListScreen