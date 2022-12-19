import React, { useEffect } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {  createBid, listMyBids } from '../../actions/bidActions'
import { BID_CREATE_RESET } from '../../constants/bidConstants'

const BidCreation = ({ history, match }) => {
  const dispatch = useDispatch()
  const bidDetails = useSelector((state) => state.bidDetails)
  const { loading, error, bid } = bidDetails

  const bidCreate = useSelector((state) => state.bidCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    bid: createdBid,
  } = bidCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: BID_CREATE_RESET })
    if (!userInfo ) {
      history.push('/home/login')
    } if (successCreate) {
      history.push(`/auction/bids/${createdBid._id}`)
    } else{

    }
  }, [
    history,
    userInfo,
    successCreate,
    createdBid,
  ])

  const createBidHandler = () => {
     history.push(`/auction/user/bidc/${match.params.id}/add`)


  }
  const [disable, setDisable] = React.useState(true);

  const checkboxHandler = () => {
   
      setDisable(false)

  }
  return (
    <><br/><br/>
      <Row className='align-items-center'>
        <Col>
          <h1>Bid on this Post Using Our Platform</h1>

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
          <Button className='my-3' onClick={createBidHandler} disabled={disable}>
            <i className='fas fa-plus'></i> Bid Now 
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default BidCreation