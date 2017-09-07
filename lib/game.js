import Board from "./board"


class Game {

  constructor() {
    this.previosClicked = null;
    this.PrevChosenCard = null;
    this.mainContainer = document.getElementById('board');
    this.board = new Board();
    this.deck = this.shuffle(this.board.deck)
    $(this.mainContainer).append('<ul id="board-ul"></ul>')
    $('#board-ul').on("click", "li", this.handleClick.bind(this) )

    this.renderCards(this.deck)

  }


  renderCards(deck){
    deck.forEach(card => $('#board-ul').append(card. domCard) )
  }


  handleClick(event){
    let curNum = parseInt($(event.currentTarget).attr('num'))
    let curSet = parseInt($(event.currentTarget).attr('set'))
    let card = this.findCard(curNum, curSet)
    let cardInDom = card.domCard;

    if(card.matched || card === this.previosClicked){
      alert("not a vaild selection")
      return
    } else {
      this.previosClicked = card;
      this.revealCard(card)
      setTimeout(this.checkPickedCard.bind(this, card) , 1000);
    }
   }
   revealCard(card){

      card.reveal();
      $(card.domCard).removeClass()
      $(card.domCard).addClass(`card${card.num}`)
    }

   hideCard(card){
      card.hide()
      $(card.domCard).removeClass()
      $(card.domCard).addClass(`hidden`)
    }

  checkPickedCard(card){
    if(this.PrevChosenCard === null){
       this.PrevChosenCard = card;
    } else {
      this.checkForMatch(this.PrevChosenCard, card)
      this.PrevChosenCard = null;
      this.previosClicked = null
    }
  }

  checkForMatch(prevoiusCard, card){

    if(prevoiusCard.isMatch(card)){
      prevoiusCard.matched = true;
      card.matched = true;
    } else {
       this.hideCard(card)
       this.hideCard(prevoiusCard)
    }
  }

  shuffle(array) {
      let counter = array.length;
      while (counter > 0) {
          let index = Math.floor(Math.random() * counter);
          counter--;
          let temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
      }

      return array;
  }

  findCard(num, set){
    return this.deck.find( card => card.num === num && card.set === set)
  }


}

export default Game;
