import React, { useContext, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { SolitaireContext } from "../context/SolitaireContext";

const HandWaste = () => {
  const {
    hand,
    setHand,
    waste,
    setWaste,
    heartFound,
    setHeartFound,
    diamondFound,
    setDiamondFound,
    clubFound,
    setClubFound,
    spadeFound,
    setSpadeFound,
  } = useContext(SolitaireContext);
  let wasteLength = 0;
  useEffect(() => {
    // setHand(deck);
    console.log(hand);
    wasteLength = waste.length;
  }, [hand, waste]);

  return (
    <Row>
      <Col>
        <div>
          <img
            className="cardImg"
            src={`./cardicons/backwardscard.png`}
            onClick={() => {
              if (hand.length > 0) {
                setWaste([...waste, hand.pop()]);
                console.log(waste);
              } else {
                console.log("hand is empty");
              }
            }}
          />
        </div>
        <h6>Hand</h6>
      </Col>
      <Col>
        <div
          style={{
            // border: "3px solid black",
            backgroundColor: "lightgray",
            borderRadius: 10,
            height: 100,
            width: 80,
            margin: 10,
          }}
        >
          {wasteLength > 0 ? <div>Test</div> : null}
        </div>
        <h6>Discard</h6>
      </Col>
    </Row>
  );
};

export default HandWaste;
