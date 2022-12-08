import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../HProduct'
import { listTopProducts } from '../../actions/productActions';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const Products= ({ match }) => {

  const dispatch = useDispatch();

  const productTopRated = useSelector(state => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts(''))
  }, [dispatch]);

  return (
            <><Row>
                {products.map((product) => (
                  <Col key={product._id} sm={10} md={6} lg={3} xl={4}>
                    <Product product={product} />
                  </Col>
                ))}
             
             </Row>
    </>
  )
}

export default Products