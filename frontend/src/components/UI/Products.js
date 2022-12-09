import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../HProduct'
import { listTopProducts } from '../../actions/productActions';

const Products= ({ match }) => {

  const dispatch = useDispatch();

  const productTopRated = useSelector(state => state.productTopRated);
  const {  products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts(''))
  }, [dispatch]);

  return (
            <><Row>
                {products.map((product) => (
                  <Col key={product._id} sm={10} md={6} lg={3} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
             
             </Row>
    </>
  )
}

export default Products