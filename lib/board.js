import Card from "./card";

class Board {
  constructor(amount){

    this.icons = this.shuffle([ "fa fa-car", "fa fa-futbol-o", "fa fa-space-shuttle",
                   "fa fa-shopping-basket", "fa fa-motorcycle",
                   "fa fa-camera", "fa fa-train", "fa fa-plane",
                   "fa fa-quora", "fa fa-superpowers", "fa fa-black-tie",
                   "fa fa-chrome", "fa fa-etsy", "fa fa-id-card",
                   "fa fa-bath","fa fa-sign-language","fa fa-wifi",
                  "fa fa-unlock", "fa fa-volume-up", "fa fa-video-camera", "fa fa-thumb-tack",
                  "fa fa-shopping-cart", "fa fa-calculator", "fa fa-commenting",
                 "fa fa-graduation-cap", "fa fa-bed", "fa fa-phone","fa fa-thumbs-o-up"] )

    this.deck_unshuffled = this.createDeck(amount);
    this.deck = this.shuffle(this.deck_unshuffled);

  }

  createDeck(amount){

    let icons = this.icons
    let deck = []
    for (let i = 1; i <= 2; i++) {
      for (let j = 1; j <= amount; j++) {
        deck.push(new Card(j, i, icons[j -1]))
      }
    }

    return deck;
  }

  gameover(){

  }

  gameOver(deck){
    return deck.every( (card) => card.matched)
  }

  reset(deck){
    deck.forEach(card => {
      card.hide()
      card.matched = false
    })
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
