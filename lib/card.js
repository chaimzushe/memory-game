class Card {

    constructor(num){
      this.num = num
      this.revealed = false
      this.matched = false
    }

    reveal(){
      this.revealed = true
    }

    hide(){
      this.revealed = false
    }

    isMatch(other_card){
      return this.card.num === other_card.num
    }

    matchFound(){
      this.matched = true
    }
}

export default Card;
