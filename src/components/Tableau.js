import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SolitaireContext } from "../context/SolitaireContext";

const Tableau = () => {
  const { deck, setDeck, tableau, setTableau } = useContext(SolitaireContext);
  return (
    <>
      <Row>
        {tableau.map((arr) => {
          return (
            <Col key={arr.length}>
              <Row>
                {arr.map((obj) => {
                  if (obj.isFaceUp) {
                    return (
                      <Col>
                        <div>
                          <img
                            className="cardImg"
                            src={`./cardicons/${obj.suit}${obj.face}.png`}
                            alt={`${obj.face} of ${obj.suit}`}
                          />
                        </div>
                      </Col>
                    );
                  } else {
                    return (
                      <Col>
                        <div>
                          <img
                            className="cardImg"
                            src={`./cardicons/backwardscard.png`}
                          />
                        </div>
                      </Col>
                    );
                  }
                })}
              </Row>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Tableau;