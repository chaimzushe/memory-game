class Card {

    constructor(num, set){
      this.num = num
      this.set = set
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
      return (this.num === other_card.num && this.set != other_card.set)
    }

    matchFound(){
      this.matched = true
    }
}

export default Card;
