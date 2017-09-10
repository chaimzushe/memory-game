import Board from "./board"


const MODES = {
  Easy: 10,
  Medium: 20,
  Hard: 30
}

class Game {

  constructor() {
    this.attemps = 0;
    this.modal = document.getElementById('modal');
    this.btnEasy = document.getElementById('level-easy');
    this.btnMedium = document.getElementById('level-medium');
    this.btnHard = document.getElementById('level-hard');
    this.p = document.getElementById('modal-p');
    this.modal.addEventListener('click', this.play.bind(this))
    this.PrevChosenCard = null;
    this.mainContainer = document.getElementById('board');
    this.board = new Board(10);
    this.deck = this.board.deck
    $(this.mainContainer).append('<ul id="board-ul"></ul>')
    $('#board-ul').on("click", "li", this.handleClick.bind(this) )
    $('.board-side-boarder-right-wrapper').on('click', 'button', this.startMode.bind(this) )

    this.renderCards(this.deck)
  }


  renderCards(deck){
    deck.forEach(card => $('#board-ul').append(card.domCard) )
  }

  play() {
    this.modal.style.display = 'none';
  }

  ending() {
    this.p.innerHTML = `Great Job! <br/> <br/>you  won with ${this.attemps} try's.`
    this.modal.style.display = 'block';
    this.restart()
  }

  restart(level = 10){
    this.attemps = 0;
    $('#board-ul').empty()
    if(this.level !== 2){
      this.deck = new Board(level).deck
    }
    this.resetBoard(this.deck)
    this.renderCards(this.deck)
  }

  resetBoard(deck){
    deck.forEach(card => {
      card.hide()
      card.matched = false
    })
  }





  handleClick(event){

    let curNum = parseInt($(event.currentTarget).attr('num'))
    let curSet = parseInt($(event.currentTarget).attr('set'))
    let card = this.findCard(curNum, curSet)
    if(card.matched || card.revealed) return;
      setTimeout(this.checkPickedCard.bind(this, card) , 1500);
      card.reveal()
   }


   startMode(event){
     let mode = $(event.currentTarget).text();
     this.p.innerHTML = `Enter ${mode} mode. <br/> <br/> The amount of cards have stands at ${MODES[mode]}!`
     this.modal.style.display = 'block';
     this.restart((MODES[mode] / 2))
   }



  checkPickedCard(card){

    if(this.PrevChosenCard === null){
       this.PrevChosenCard = card;
    } else {
      this.checkForMatch(this.PrevChosenCard, card)
      this.PrevChosenCard = null;
      this.attemps++;
    }
    if(this.board.gameOver(this.deck)){
      this.ending()
    }
  }


  checkForMatch(prevoiusCard, card){

    if(prevoiusCard.isMatch(card)){
      prevoiusCard.matched = true;
      card.matched = true;
    } else {
       card.hide()
       prevoiusCard.hide()
    }
  }

  findCard(num, set){
    return this.deck.find( card => card.num === num && card.set === set)
  }


}

export default Game;
