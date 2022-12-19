import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../../components/Product'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import ProductCarousel from '../../components/ProductCarousel'
import Meta from '../../components/Meta'
import { listProducts } from '../../actions/productActions';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const StoreScreen = ({ match }) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
          <Link to='/home' className='btn btn-light'>
            Go Back
          </Link>
        )
      }
      
      <ButtonGroup size="md" className="mb-2" style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
      <Link to='/store'>
        <Button>View By Products</Button>
        </Link>
        <div style={{
        width:'10px',
        height: 'auto',
        display: 'inline-block'
      }}/>
        <Link to='/store/storeby'>
        <Button>View By Stores</Button>
        </Link>
      </ButtonGroup>
    <h1 style={{
        display: 'flex',
        justifyContent: 'center',
      }}>Latest Products</h1>
      { loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </>
          )}
    </>
  )
}

export default StoreScreen