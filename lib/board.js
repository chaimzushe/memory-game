import Card from "./card";

class Board {
  constructor(){
    this.deck = this.createDeck();
  }

  createDeck(){
    let deck = []
    for (let i = 1; i <= 2; i++) {
      for (let j = 1; j <= 15; j++) {
        deck.push(new Card(j, i))
      }
    }
    return deck;
  }

}



export default Board;
