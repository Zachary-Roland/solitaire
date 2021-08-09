import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { SolitaireContext } from "../context/SolitaireContext";
import { useDrag } from "react-dnd";

const Tableau = () => {
  const { deck, setDeck, tableau, setTableau } = useContext(SolitaireContext);
  const ItemTypes = {
    CARD: "card",
  };
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
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
                            ref={drag}
                            style={{
                              opacity: isDragging ? 0.5 : 1,
                              cursor: "move",
                            }}
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
