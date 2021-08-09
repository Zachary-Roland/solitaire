import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Tableau from "./Tableau";
import HandWaste from "./HandWaste";
import { SolitaireContext } from "../context/SolitaireContext";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const SolitairePage = () => {
  const { deck, setDeck, tableau, setTableau } = useContext(SolitaireContext);

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <Row>
          <Col>
            <h1>Play Solitaire!</h1>
          </Col>
        </Row>
        <HandWaste />
        <Tableau />
      </Container>
    </DndProvider>
  );
};

export default SolitairePage;
