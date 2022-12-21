import React from "react";

import Slider from "react-slick";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

import "../../styles/hero-slider.css";


const HeroSlider = () => {
  const settings = {
    fade: true,
    speed: 2000,
    autoplaySpeed: 3000,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };
  return (
    <Slider {...settings} className="hero__slider">
      <div className="slider__item slider__item-01 mt0">
        <Container>
          <div className="slider__content ">
            <h1 className="text-light mb-3">NEED SOME MORE WHEELS?</h1>
            <h4 className="text-light mb-4">Buy & Sell Your Car on SAKA MOTORS and get the best Deal</h4>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className='buttons d-flex'>
            <Link to={'/posts'}>
                  <button className='btn btn-danger me-4 rounded-pill px-4 py-2'>
                    Buy Your Car
                  </button>
             </Link>
            <Link to={'/posts/apost'}>
                <button className='btn btn-dark rounded-pill px-4 py-2'>
                  Sell Your Car{' '}
                </button>
             </Link>

              </div>
          </div>
        </Container>
      </div>

      <div className="slider__item slider__item-02 mt0">
        <Container>
          <div className="slider__content ">
          <h1 className="text-light mb-3">NEED SOME MORE WHEELS?</h1>
            <h4 className="text-light mb-4">Buy & Sell Your Car on SAKA MOTORS and get the best Deal</h4>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className='buttons d-flex'>
            <Link to={'/posts'}>
                  <button className='btn btn-danger me-4 rounded-pill px-4 py-2'>
                    Buy Your Car
                  </button>
             </Link>
             <Link to={'/posts/apost'}>
                <button className='btn btn-dark rounded-pill px-4 py-2'>
                  Sell Your Car{' '}
                </button>
             </Link>
              </div>
            
          </div>
        </Container>
      </div>

      <div className="slider__item slider__item-03 mt0">
        <Container>
          <div className="slider__content ">
          <h1 className="text-light mb-3">NEED SOME MORE WHEELS?</h1>
            <h4 className="text-light mb-4">Buy & Sell Your Car on SAKA MOTORS and get the best Deal</h4>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className='buttons d-flex'>
            <Link to={'/posts'}>
                  <button className='btn btn-danger me-4 rounded-pill px-4 py-2'>
                    Buy Your Car
                  </button>
             </Link>
             <Link to={'/posts/apost'}>
                <button className='btn btn-dark rounded-pill px-4 py-2'>
                  Sell Your Car{' '}
                </button>
             </Link>
              </div>
          </div>
        </Container>
      </div>
    </Slider>
  );
};

export default HeroSlider;
