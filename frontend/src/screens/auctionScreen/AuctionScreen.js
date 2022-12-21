import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Auction from '../../components/Auction'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import { listAuctions } from '../../actions/auctionActions';

const AuctionsScreen = ({ match }) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch();

  const auctionList = useSelector(state => state.auctionList);
  const { loading, error, auctions } = auctionList;

  useEffect(() => {
    dispatch(listAuctions(keyword))
  }, [dispatch, keyword]);

  return (
    <>
      <Meta />
          <Link to='/home' className='btn btn-light'>
            Go Back
          </Link>
          <h1 style={{
        display: 'flex',
        justifyContent: 'center',
      }}>Welcome to Auction Module</h1>
      { loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <>
              <Row>
                {auctions.map((auction) => (
                  <Col key={auction._id} sm={12} md={6} lg={4} xl={3}>
                    <Auction auction={auction} />
                  </Col>
                ))}
              </Row>
            </>
          )}
    </>
  )
}

export default AuctionsScreen