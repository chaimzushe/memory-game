import Card from "./card";

class Board {
  constructor(amount){
    this.deck = this.createDeck(amount);
  }

  createDeck(amount){
    debugger
    let deck = []
    for (let i = 1; i <= 2; i++) {
      for (let j = 1; j <= amount; j++) {
        deck.push(new Card(j, i))
      }
    }
    return deck;
  }



}



export default Board;
