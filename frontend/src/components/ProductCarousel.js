import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()
  const productTopRated = useSelector(state => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading
    ? <Loader />
    : error
      ? <Message variant='danger'>{error}</Message>
      : (
        <Carousel pause='hover' className='bg-dark' interval={3000}>
          {products.map(product => (
            
            <Carousel.Item key={product._id} >
              <Link to={`/store/product/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid style={{
              display: 'flex',
              justifyContent: 'center',             
            }}/>
                <Carousel.Caption className='carousel-caption' style={{
              position: 'absolute',
              top:'-20px'
            }}>
                  <h2>
                    {product.name} (Rs.{product.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )
}

export default ProductCarousel
