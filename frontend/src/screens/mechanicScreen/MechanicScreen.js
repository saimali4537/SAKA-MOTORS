import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Prot from '../../components/Prot'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Meta from '../../components/Meta'
import { listProts } from '../../actions/protActions';


const ProtScreen = ({ match }) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch();

  const protList = useSelector(state => state.protList);
  const { loading, error, prots } = protList;

  useEffect(() => {
    dispatch(listProts(keyword))
  }, [dispatch, keyword]);

  return (
    <>
    <Meta />
    <h1 style={{
        display: 'flex',
        justifyContent: 'center',
      }}>Our Mechanics</h1>
      { loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
            <>
              <Row>
                {prots.map((prot) => (
                  <Col key={prot._id} sm={12} md={6} lg={4} xl={3}>
                    <Prot prot={prot} />
                  </Col>
                ))}
              </Row>
            </>
          )}
    </>
  )
}

export default ProtScreen