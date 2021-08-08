import React, { useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Tableau from "./Tableau";
import { SolitaireContext } from "../context/SolitaireContext";

const SolitairePage = () => {
  const { deck, setDeck, tableau, setTableau } = useContext(SolitaireContext);
  return (
    <>
      <Container>
        <Tableau />
      </Container>
    </>
  );
};

export default SolitairePage;
