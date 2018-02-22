
class Card {

    constructor(num, set, icon){
      this.num = num;
      this.set = set;
      this.revealed = false;
      this.matched = false;
      this.domCard = $(`<li set=${set} num=${num}> </li>`)
      this.icon = icon;
    }


    reveal(){
      this.revealed = true;
      this.domCard.removeClass();
      this.domCard.append(`<div id="icon-wrapper"> <div class='${this.icon} revealed'> </div> </div>`);
    }

    hide(){
      this.revealed = false
      this.matched = false;
      this.domCard.empty()
      this.domCard.addClass(`hidden`)
    }

    isMatch(otherCard){
      return (this.num === otherCard.num && this.set !== otherCard.set)
    }

    matchFound(){
      this.matched = true
    }


}

export default Card;
