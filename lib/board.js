import Card from "./card";

class Board {
  constructor(amount){
    this.deck_unshuffled = this.createDeck(amount);
    this.deck = this.shuffle(this.deck_unshuffled);
  }

  createDeck(amount){
    let deck = []
    for (let i = 1; i <= 2; i++) {
      for (let j = 1; j <= amount; j++) {
        deck.push(new Card(j, i))
      }
    }
    return deck;
  }

  gameover(){

  }

  gameOver(deck){
    return deck.every( (card) => card.matched)
  }
  
  shuffle(deck) {
      let counter = deck.length;
      while (counter > 0) {
          let index = Math.floor(Math.random() * counter);
          counter--;
          let temp = deck[counter];
          deck[counter] = deck[index];
          deck[index] = temp;
      }

      return deck;
  }



}



export default Board;
