import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Store from '../../components/Store'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import ProductCarousel from '../../components/ProductCarousel'
import Meta from '../../components/Meta'
import { listStores } from '../../actions/storeActionsA';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const Storeby = ({ match }) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch();

  const storeList = useSelector(state => state.storeList);
  const { loading, error, stores } = storeList;

  useEffect(() => {
    dispatch(listStores(keyword))
  }, [dispatch, keyword]);

  return (
    <>
      <Meta />
      {!keyword ? (
        < ></>
      ) : (
          <Link to='/' className='btn btn-light'>
            Go Back
          </Link>
        )
      }
      <br/><br/><ButtonGroup aria-label='Basic example'>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to='/store'>
        <Button variant='secondary'>View By Products</Button>
      </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to='/storeby'>
        <Button variant='secondary'>View By Stores</Button>
      </Link>
    </ButtonGroup>
      <h1> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Latest Stores</h1>
      { loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <>
              <Row>
                {stores.map((store) => (
                  <Col key={store._id} sm={12} md={6} lg={4} xl={3}>
                    <Store store={store} />
                  </Col>
                ))}
              </Row>
            </>
          )}
    </>
  )
}

export default Storeby