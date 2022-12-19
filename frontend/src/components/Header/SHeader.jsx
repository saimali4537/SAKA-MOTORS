import React, { useRef, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import logo from './../../image/sm.png';
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import {NavDropdown } from 'react-bootstrap'
import SearchBox from '../SearchBoxS'
import { logouts } from '../../actions/userActions'
import { logout1 } from '../../actions/managerActions'


const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
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
    display: "Find Cars",
  },
  {
    path: "/mechanic",
    display: "Find Mechanics",
  },
  {
    path: "/auction",
    display: "Auction",
  },


];

const SHeader = ({location,history}) => {
  const dispatch = useDispatch();
  const [disable, setDisable] = React.useState('');


  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const managerLogin = useSelector(state => state.managerLogin)
  const { managerInfo } = managerLogin
  const mechanicLogin = useSelector(state => state.mechanicLogin)
  const { mechanicInfo } = mechanicLogin
  useEffect(() => {
    if(userInfo||managerInfo||mechanicInfo){
      setDisable('none')
    }
  }, [userInfo])


  const logoutHandler = () => {
    dispatch(logouts())
  }
  const logoutHandler1 = () => {
    dispatch(logout1())
  }
  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i class="ri-phone-fill"></i> +92-312-5803751
                </span>
              </div>
            </Col>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
            {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id='username'
                >
                  <LinkContainer to='/store/profile' >
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                    
              <Link to="/store/logins" className=" d-flex align-items-center gap-1" style={{pointerEvents: disable}}>
                  <i class="ri-login-circle-line"></i> Login
                </Link>
            
                )}
                {managerInfo ? (
                <NavDropdown
                  title={managerInfo.name}
                  id='username'
                >
                  <LinkContainer to='/store/profilesm' >
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler1}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                    
              <Link to="/store/loginsm" className=" d-flex align-items-center gap-1">
                
                </Link>
            
                )}
              {managerInfo && managerInfo.isAdmin && (
                <NavDropdown title='Manager' id='managermenu'>
                  <LinkContainer to='/store/manager/mystore'>
                    <NavDropdown.Item>My Store</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/store/manager/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/store/manager/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              <Link to="/store/registers" className=" d-flex align-items-center gap-1" style={{pointerEvents: disable}}>
                  <i class="ri-user-line"></i> Register
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="5" md="3" sm="8">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-6">
                   
                    <img
              src={logo}
              width="130"
              height="50"
              className="d-inline-block align-top"/>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Pakistan</h4>
                  <h6>Taxila, Pakistan</h6>
                </div>
              </div>
            </Col>
            {userInfo && userInfo.isManager && (
                 <Col
                 lg="2"
                 md="3"
                 sm="0"
                 className=" d-flex align-items-center justify-content-end "
               >
                 <button className="header__btn btn ">
                   <Link to="/store/storec">
                   <i class="ri-shopping-cart-2-line"></i>Create Your Store
                   </Link>
                 </button>
               </Col>
              )}
            

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/store/cart">
                <i class="ri-shopping-cart-2-line"></i>Cart
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar" >
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
              <Route render={({ history }) => <SearchBox history={history} />} />
               
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default SHeader;
