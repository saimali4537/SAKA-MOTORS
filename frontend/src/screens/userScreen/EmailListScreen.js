import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listEmails } from '../../actions/emailActions'

const EmailListScreen = ({ history , match}) => {

  const dispatch = useDispatch()

  const emailList = useSelector((state) => state.emailList)
  const { loading, error, emails } = emailList

  const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin

  useEffect(() => {
    if (adminInfo && adminInfo.isAdmin) {
      dispatch(listEmails(''))
    } else {
      history.push('/admin')
    }
  }, [dispatch, history, adminInfo])

  return (
    <div class="col main pt-5 mt-3">
    <><br/><br/>
      <h1>Emails</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>EMAIL</th>
                </tr>
              </thead>
              <tbody>
              {emails.map((email) => (
                    <tr key={email._id}>
                      <td>{email._id}</td>
                      <td>{email.email}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}<br/><br/>
    </></div>
  )
}

export default EmailListScreen