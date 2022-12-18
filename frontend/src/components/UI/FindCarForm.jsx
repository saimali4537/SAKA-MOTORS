import React from "react";
import "../../styles/find-car-form.css";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";
import SearchBox from '../SearchBoxP'
import { Route } from 'react-router-dom'


const FindCarForm = () => {
  return (
    <Form className="form">
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
      <div className="search__box">
              <Route render={({ history }) => <SearchBox history={history} />} />
               
              </div>
      </div>
    </Form>
  );
};

export default FindCarForm;
