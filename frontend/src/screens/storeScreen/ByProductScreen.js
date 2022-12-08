import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../../components/Product'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listSProducts } from '../../actions/productActions';
import {
  listStoreDetails,
} from '../../actions/storeActions'

const StoreScreen = ({ match }) => {
  const keyword = match.params.keyword
  const storeId = match.params.id

  const dispatch = useDispatch();

  const productSList = useSelector(state => state.productSList);
  const { loading, error, products } = productSList;

  const storeDetails = useSelector((state) => state.storeDetails)
  const { store } = storeDetails

  useEffect(() => {
    dispatch(listSProducts(keyword, storeId))
    if (!store._id || store._id !== match.params.id) {
      dispatch(listStoreDetails(match.params.id))
    }
  }, [dispatch, keyword, storeId]);

  return (
    <>
     
      <h1> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{store.name}</h1>
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