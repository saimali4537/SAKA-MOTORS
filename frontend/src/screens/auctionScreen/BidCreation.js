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
   if(userInfo){
    if(userInfo===bid.user){
setDisable(true)
    }
  }
    if (!userInfo ) {
      history.push('/login')
    } if (successCreate) {
      history.push(`/bids/${createdBid._id}`)
    } else{

    }
  }, [
    history,
    userInfo,
    successCreate,
    createdBid,
  ])

  const createBidHandler = () => {
      dispatch(createBid(`${match.params.id}`))


  }
  const [disable, setDisable] = React.useState(false);


  return (
    <><br/><br/>
      <Row className='align-items-center'>
        <Col>
          <h1>Bid on this Post Using Our Platform</h1>

        </Col>
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