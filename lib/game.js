import Board from "./board"


class Game {

  constructor() {
    this.mainContainer = document.getElementById('board');
    this.board = new Board();
    this.deck = this.shuffle(this.board.deck)
    $(this.mainContainer).append('<ul id="board-ul"></ul>')
    this.renderCards()
  }

  renderCards(){
    this.boardUl = document.getElementById('board-ul');
    $(this.boardUl).empty()
    for (let i = 0; i < this.deck.length; i++) {
      let card = this.deck[i]
      if(card.revealed) {
        $(this.boardUl).append(`<li id='card${card.num}'> ${card.num} </li>`)
      } else {
        $(this.boardUl).append(`<li id='hidden_card'> ${card.num} </li>`)
      }
      $('li').click( this.handleClick.bind(this) )
    }
  }

  handleClick(event){
    let card = this.findCard(parseInt($(event.target).text()))
    card.revealed = true;
    this.renderCards()

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

  findCard(num){
    return this.deck.find( card => card.num === num)
  }


}

export default Game;
