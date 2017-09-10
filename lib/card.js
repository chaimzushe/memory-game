class Card {

    constructor(num, set){
      this.num = num;
      this.set = set;
      this.revealed = false;
      this.matched = false;
      this.domCard = $(`<li set=${set} num=${num} class=hidden> </li>`)
    }


    reveal(){
      this.revealed = true;
      $(this.domCard).removeClass()
      $(this.domCard).append(`<div id="icon-wrapper"> <div class='${this.getClass(this.num)} revealed'> </div> </div>`)
    }

    hide(){
      this.revealed = false
      $(this.domCard).empty()
      $(this.domCard).addClass(`hidden`)
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
        return "fa fa-futbol-o"
        case 3:
        return "fa fa-space-shuttle"
        case 4:
        return "fa fa-shopping-basket"
        case 5:
        return "fa fa-motorcycle"
        case 6:
        return "fa fa-camera"
        case 7:
        return "fa fa-train"
        case 8:
        return "fa fa-plane"
        case 9:
        return "fa fa-quora"
        case 10:
        return "fa fa-black-tie"
        case 11:
        return "fa fa-superpowers"
        case 12:
        return "fa fa-chrome"
        case 13:
        return "fa fa-etsy"
        case 14:
        return "fa fa-id-card"
        case 15:
        return "fa fa-bath"
      }
    }
}

export default Card;
