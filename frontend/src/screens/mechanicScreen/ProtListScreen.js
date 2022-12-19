import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listMyProts, deleteProt, createProt } from '../../actions/protActions'
import { PROT_CREATE_RESET } from '../../constants/protConstants'

const ProtListScreen = ({ history, match }) => {

  const dispatch = useDispatch()

  const protListMy = useSelector((state) => state.protListMy)
  const { loading, error, prots } = protListMy

  const protDelete = useSelector((state) => state.protDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = protDelete

  const protCreate = useSelector((state) => state.protCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    prot: createdProt,
  } = protCreate

  const mechanicLogin = useSelector((state) => state.mechanicLogin)
  const { mechanicInfo } = mechanicLogin

  useEffect(() => {
    dispatch({ type: PROT_CREATE_RESET })

    if (!mechanicInfo || !mechanicInfo.isAdmin) {
      history.push('/mechanic')
    } if (successCreate) {
      history.push(`/mechanic/prot/${createdProt._id}/edit`)
    } else {
      dispatch(listMyProts(''))
    }
  }, [
    dispatch,
    history,
    mechanicInfo,
    successDelete,
    successCreate,
    createdProt,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProt(id))
    }
  }

  const createProtHandler = () => {
    history.push('/mechanic/protadd')
  }

  return (
    <div class="col main pt-5 mt-3">
    <><br/><br/>
      <Row className='align-items-center'>
        <Col>
          <h1>Protfolio</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProtHandler}>
            <i className='fas fa-plus'></i> Create Profile
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
                    <th>AVERAGE RATE</th>
                    <th>CATEGORY</th>
                    <th>CONTACT</th>
                    <th>LOCATION</th>
                    <th>STORE</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {prots.map((prot) => (
                    <tr key={prot._id}>
                      <td>{prot._id}</td>
                      <td>{prot.name}</td>
                      <td>{prot.Avg}</td>
                      <td>{prot.category}</td>
                      <td>{prot.cnt}</td>
                      <td>{prot.location}</td>
                      <td>{prot.store}</td>
                      <td>
                        <LinkContainer to={`/mechanic/prot/${prot._id}/edit`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(prot._id)}
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

export default ProtListScreen