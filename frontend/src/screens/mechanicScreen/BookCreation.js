import React, { useEffect } from 'react'
import {  Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { BOOK_CREATE_RESET } from '../../constants/bookConstants'

const BookCreation = ({ history, match }) => {

  const dispatch = useDispatch()
  const [disable, setDisable] = React.useState(true);

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
    } else {
    }
  }, [
    history,
    userInfo,
    successCreate,
    createdBook,
  ])
  const checkboxHandler = () => {
    setDisable(false)
  }


  return (
    <><br/><br/>
      <Row className='align-items-center'>
        <Col>
          <h1>Booking of Mechanic Using Our Platform</h1>
        </Col>
        <h2>Terms of Services</h2>
          <p>This Terms of Services describes how SAKA Motors(the “Site” or “we”) collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.

We collect Device Information using the following expertise:

<li>

“Cookies” are data files that are located on your device or computer and often include an unspecified unique identifier. For more information about cookies, and how to inactivate cookies, visit http://www.allaboutcookies.org.
</li>

<li>

Don't try to scam with anyone and don't provide falsify and illegal information which lead to account termination
and legal steps.
</li>

<li>
 
Don't try to scam with anyone and don't provide falsify and illegal information which lead to account termination
and legal steps.
</li>

<li>
Comply with law or with legal process. Try to protect against misuse or unauthorized use of Our Services; or protect the personal safety or property of our users or the public( who are using our websit)
</li>
</p>
<div>
          <input type="checkbox" id="agree" onChange={checkboxHandler} />
          <label htmlFor="agree"> I agree to <b>terms and conditions</b></label>
        </div>
        <Col className='text-right'>
        <a href={`/mechanic/book/add/${match.params.id}`}>
          <Button className='my-3' disabled={disable}>
            <i className='fas fa-plus'></i> Book Mechanic Now
          </Button>
        </a>
        </Col>
      </Row>
    </>
  )
}

export default BookCreation