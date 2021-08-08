export default function playGame() {
  const suit = ["spades", "hearts", "diamonds", "clubs"];
  const face = [
    "ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "jack",
    "queen",
    "king",
  ];
  let deck = new Array();
  // function to create full deck of cards (no jokers)
  suit.forEach((i) => {
    face.forEach((j) => {
      let card = { face: j, suit: i, value: null, isFaceUp: false };
      if (card.face === "ace") {
        // in solitaire aces are always 1?
        card.value = 1;
      } else if (
        card.face === "jack" ||
        card.face === "queen" ||
        card.face === "king"
      ) {
        card.value = 10;
      } else {
        card.value = parseInt(j);
      }
      deck.push(card);
    });
  });
  // shuffle the deck before dealing
  function shuffle(array) {
    let m = array.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }
  shuffle(deck);
  // deal cards
  // tableau has 7 piles of cards. So 7 arrays of cards
  const tableau = [[], [], [], [], [], [], []];
  function deal() {
    for (let i = 0; i < 7; i++) {
      // dealing one card from left to right, first card dealt is face up.
      // then start from the next pile over from the left, firs card is face up rest are face down.4
      let startingPile = tableau[i];
      let faceCardToAdd = deck.pop();
      faceCardToAdd.isFaceUp = true;
      startingPile.push(faceCardToAdd);
      for (let j = i + 1; j < 7; j++) {
        // after first card, all cards are facedown.
        let pileToAdd = tableau[j];
        let cardToAdd = deck.pop();
        pileToAdd.push(cardToAdd);
      }
    }
  }
  deal();
  return { deck };
}
