import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/footer.css";
import {  emailA } from '../../actions/emailActions';
const quickLinks = [
  {
    path: "/about",
    display: "About",
  },

  {
    path: "/store",
    display: "Store",
  },

  {
    path: "/posts",
    display: "Car Listing",
  },
  {
    path: "/mechanic",
    display: "Mechaincs",
  },

  {
    path: "/auction",
    display: "Auction",
  },
];


const Footer = () => {
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(emailA(email))
    window.location.reload(false);
  }
  const date = new Date();
  const year = date.getFullYear();
  
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" md="4" sm="12">
            <div className="logo footer__logo">
              <h1>
                <Link to="/home" className=" d-flex align-items-center gap-2">
                  <i class="ri-car-line"></i>
                  <span>
                    SAKA <br />motors
                  </span>
                </Link>
              </h1>
            </div>
            <p className="footer__logo-content">
            SAKA Motors is platform which will provide unique experience to buy 
and sell cars with best possibilities. We are offering our best services to satisfy end user needs.
Here you have a greater chances of getting a quality product including cars and spare parts. 
            </p>
          </Col>

          <Col lg="2" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title">Quick Links</h5>
              <ListGroup>
                {quickLinks.map((item, index) => (
                  <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title mb-4">Head Office</h5>
              <p className="office__info">Uppal Chowk, Wah Cantt, Pakistan</p>
              <p className="office__info">Phone: +923125803751</p>

              <p className="office__info">Email: sakaamotors@gmail.com</p>

              <p className="office__info">Office Time: 10am - 5pm</p>
            </div>
          </Col>

          <Col lg="3" md="4" sm="12">
            <div className="mb-4">
              <h5 className="footer__link-title">Newsletter</h5>
              <p className="section__description">Subscribe our newsletter</p>
              <div className="newsletter">
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                <span style={{color:'blue',cursor:'pointer'}} onClick={submitHandler}>
                  <i class="ri-send-plane-line" ></i>
                </span>
              </div>
            </div>
          </Col>

          <Col lg="12">
            <div className="footer__bottom">
              <p className="section__description d-flex align-items-center justify-content-center gap-1 pt-4">
                <i class="ri-copyright-line"></i>This Website is for Educational Purpose And Data is taken from Pakwheels.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
