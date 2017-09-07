import Board from "./board"


class Game {

  constructor() {
    this.PrevChosenCard = null;
    this.mainContainer = document.getElementById('board');
    this.board = new Board();
    this.deck = this.shuffle(this.board.deck)
    $(this.mainContainer).append('<ul id="board-ul"></ul>')
    this.renderCards()
    $('#board-ul').on("click", "li", this.handleClick.bind(this) )

  }

  

  renderCards(){
    this.boardUl = document.getElementById('board-ul');
    $(this.boardUl).empty()
    for (let i = 0; i < this.deck.length; i++) {
      let card = this.deck[i]
      if(card.revealed) {
        $(this.boardUl).append(`<li set=${card.set} num=${card.num} id='card${card.num}'> </li>`)
      } else {
        $(this.boardUl).append(`<li id='hidden_card' set=${card.set} num=${card.num}>  </li>`)
      }
    }
  }

  handleClick(event){
    let curNum = parseInt($(event.target).attr('num'))
    let curSet = parseInt($(event.target).attr('set'))
    let card = this.findCard(curNum, curSet)
    if(card.matched){
      return
    }
    if(card === this.PrevChosenCard){
      alert("Don't click on the same card...")
    } else {
      card.revealed = true;
      this.PrevChosenCard = card;
      this.renderCards()
      setTimeout(this.checkPickedCard.bind(this, card) , 1000);
    }
  }

  checkPickedCard(card){

    if(this.PrevChosenCard === null){

    } else {
      this.checkForMatch(this.PrevChosenCard, card)
    }
  }

  checkForMatch(prevoiusCard, card){

    if(prevoiusCard.isMatch(card)){
      prevoiusCard.matched = true;
      prevoiusCard.revealed = true;
      card.matched = true;
      card.revealed = true;
      this.PrevChosenCard = null;
    } else {
      prevoiusCard.hide()
      card.hide()
      this.PrevChosenCard = null;
      this.renderCards()

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
