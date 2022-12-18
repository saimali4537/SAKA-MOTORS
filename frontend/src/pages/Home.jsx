import React from "react";

import HeroSlider from "../components/UI/HeroSlider";
import Helmet from "../components/Helmet/Helmet";

import { Container, Row, Col } from "reactstrap";
import FindCarForm from "../components/UI/FindCarForm";
import AboutSection from "../components/UI/AboutSection";
import ServicesList from "../components/UI/ServicesList";
import comp from "../assets/data/comp";
import CompItem from "../components/UI/CompItem";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";
import Posts from "../components/UI/Posts";
import Products from "../components/UI/Products";




const Home = () => {
  return (
    <Helmet title="Home">
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section">
        <HeroSlider />
      </section>
      {/* =========== about section ================ */}
      <AboutSection />
      {/* ========== services section ============ */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">See our</h6>
              <h2 className="section__title">Popular Services</h2>
            </Col>

            <ServicesList />
          </Row>
        </Container>
      </section>
      {/* =========== car companies section ============= */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">We have</h6>
              <h2 className="section__title">Companies</h2>
            </Col>
            {comp.slice(0, 12).map((item) => (
              <CompItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
        </section>
         {/* =========== become a member section ============ */}
      <BecomeDriverSection />
      {/* =========== product offer section ============= */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Come with</h6>
              <h2 className="section__title">Hot Products</h2>
            </Col>
          <Products/>
          </Row>
        </Container>
      </section>


      {/* =============== post section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Explore our posts</h6>
              <h2 className="section__title">Latest Posts</h2>
            </Col>
              <Posts/>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
