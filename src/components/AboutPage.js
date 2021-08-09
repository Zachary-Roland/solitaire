import React from "react";
import { Container, Col, Row } from "react-bootstrap";

const AboutPage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>About This App</h2>
        </Col>
      </Row>
      <Row className="justify-content-lg-center">
        <Col lg={6}>
          <h6>
            This is a web app built in React. On the backend, it utlises an
            Express server and a NoSQL database with Mongoose/MongoDB. Users can
            sign up for an account and login. For sessions, this app uses
            Passport with cookies and JWTs. After login, the user should be able
            to play solitaire. At the moment, solitaire is not functional.
          </h6>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
