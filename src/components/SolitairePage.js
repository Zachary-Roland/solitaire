import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Tableau from "./Tableau";
import HandWaste from "./HandWaste";
import { SolitaireContext } from "../context/SolitaireContext";

const SolitairePage = () => {
  const { deck, setDeck, tableau, setTableau } = useContext(SolitaireContext);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Play Solitaire!</h1>
          </Col>
        </Row>
        <HandWaste />
        <Tableau />
      </Container>
    </>
  );
};

export default SolitairePage;
