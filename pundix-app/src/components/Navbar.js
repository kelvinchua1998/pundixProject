import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Navbar({ account, balance }) {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap shadow">
      <Container>
        <Row>
          <Col>
            <h1 className="navbar-brand col-sm-3 col-md-2">Pundix project</h1>
          </Col>
          <Col>
            <h1 className="navbar-brand ">Balance: {balance}</h1>
          </Col>
          <Col>
            <h1 className="navbar-brand ">Account: {account}</h1>
          </Col>
        </Row>
      </Container>
    </nav>
  );
}

export default Navbar;
