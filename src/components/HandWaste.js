import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { SolitaireContext } from "../context/SolitaireContext";

const HandWaste = () => {
  const [wasteLength, setWasteLength] = useState(0);
  const [currWasteCard, setCurrWasteCard] = useState(null);
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
  let topWaste = null;
  useEffect(() => {
    setWasteLength(waste.length);
    topWaste = waste.slice(-1);
    setCurrWasteCard(topWaste[0]);
  }, [hand, waste]);

  return (
    <>
      <Row>
        {/* This is the hand pile */}
        <Col xs={2} className="pilePlace">
          <div>
            {hand.length > 0 ? (
              <img
                className="cardImg"
                src={`./cardicons/backwardscard.png`}
                onClick={() => {
                  if (hand.length > 0) {
                    setWaste([...waste, hand.pop()]);
                    // console.log(waste);
                  }
                }}
              />
            ) : (
              <div
                style={{ height: 100, width: 100 }}
                onClick={() => {
                  if (hand.length === 0) {
                    setHand(waste);
                    setWaste([]);
                  }
                }}
              ></div>
            )}
          </div>
          <h6>Hand</h6>
        </Col>
        {/* this is the waste pile */}
        <Col xs={2} className="pilePlace">
          <div>
            {wasteLength > 0 ? (
              waste.map((v) => {
                if (v === currWasteCard) {
                  return (
                    <img
                      src={`./cardicons/${currWasteCard.suit}${currWasteCard.face}.png`}
                    />
                  );
                }
              })
            ) : (
              <div style={{ height: 100, width: 100 }}></div>
            )}
          </div>
          <h6>Discard</h6>
        </Col>
        {/*  */}
      </Row>
      <Row>
        <Col>
          <br />
        </Col>
      </Row>
    </>
  );
};

export default HandWaste;
