class Card {

    constructor(num, set){
      this.num = num;
      this.set = set;
      this.revealed = false;
      this.matched = false;
      this.domCard = $(`<li set=${set} num=${num} class=hidden> </li>`)
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

    getClass(num){
      switch (num){
        case 1:
        return "fa fa-car"
        case 2:
        return "fa fa-car"
        case 3:
        return "fa fa-car"
        case 4:
        return "fa fa-car"
        case 5:
        return "fa fa-car"
        case 6:
        return "fa fa-car"
        case 7:
        return "fa fa-car"
        case 8:
        return "fa fa-car"
        case 9:
        return "fa fa-car"
        case 10:
        return "fa fa-car"
        case 11:
        return "fa fa-car"
        case 12:
        return "fa fa-car"
        case 13:
        return "fa fa-car"
        case 14:
        return "fa fa-car"
      }
    }
}

export default Card;
