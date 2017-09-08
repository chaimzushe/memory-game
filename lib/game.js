import Board from "./board"


class Game {

  constructor() {
    this.attemps = 0;
    this.modal = document.getElementById('modal');
     this.p = document.getElementById('modal-p');
    this.modal.addEventListener('click', this.play.bind(this))
    this.previosClicked = null;
    this.PrevChosenCard = null;
    this.processing = false;
    this.mainContainer = document.getElementById('board');
    this.board = new Board(10);
    this.deck = this.shuffle(this.board.deck)
    $(this.mainContainer).append('<ul id="board-ul"></ul>')
    $('#board-ul').on("click", "li", this.handleClick.bind(this) )

    this.renderCards(this.deck)

  }


  renderCards(deck){
    deck.forEach(card => $('#board-ul').append(card.domCard) )
  }

  play() {
    this.modal.style.display = 'none';
  }

  ending() {
    this.p.innerHTML = `Great Job! you won! in ${this.attemps} times`
    this.modal.style.display = 'block';
    this.restart()
  }

  restart(){
    this.attemps = 0;
    $('#board-ul').empty()
    this.deck = this.shuffle(this.deck);
    this.resetBoard(this.deck)
    this.renderCards(this.deck)
  }

  resetBoard(deck){
    deck.forEach(card => {
      this.hideCard(card);
      card.matched = false
    })
  }



  gameOver(){
    return this.deck.every( (card) => card.matched)
  }

  handleClick(event){

    let curNum = parseInt($(event.currentTarget).attr('num'))
    let curSet = parseInt($(event.currentTarget).attr('set'))
    let card = this.findCard(curNum, curSet)
    if(card.matched || card === this.previosClicked){
      alert("not a vaild selection")
      return
    } else {
      this.previosClicked = card;
      this.revealCard(card)
      this.processing = true;
      setTimeout(this.checkPickedCard.bind(this, card) , 1000);

    }
   }





   revealCard(card){

      card.reveal();
      $(card.domCard).removeClass()
     $(card.domCard).addClass(`${card.getClass(card.num)}`)
     $(card.domCard).addClass("revealed")
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
      this.attemps++;
    }
    this.processing = false;
    if(this.gameOver()){
    this.ending()
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
