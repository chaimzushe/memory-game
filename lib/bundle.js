/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);




document.addEventListener('DOMContentLoaded', () => {
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
})


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board__ = __webpack_require__(2);



const MODES = {
  Easy: 10,
  Medium: 20,
  Hard: 30
}


class Game {

  constructor() {
    this.processing = false;
    this.attemps = 0;
    this.modal = document.getElementById('modal');
    this.p = document.getElementById('modal-p');

    this.PrevChosenCard = null;
    this.board = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */](10);
    this.deck = this.board.deck

    $('#board-ul').on("click", "li", this.handleClick.bind(this) )
    $('.board-side-boarder-right-wrapper').on('click', 'button', this.startMode.bind(this) )
    this.modal.addEventListener('click', this.play.bind(this))

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

  restart(level =10){
    this.attemps = 0;
    $('#board-ul').empty()
    this.board =  new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */](level)
    this.deck = this.board.deck
    this.renderCards(this.deck)
  }


   startMode(event){
     //if($(event.currentTarget).text() === 'Timer') return;
     let mode = $(event.currentTarget).text();
     this.p.innerHTML = `Enter ${mode} mode. <br/> <br/> The amount of cards have stands at ${MODES[mode]}!`
     this.modal.style.display = 'block';
     this.restart((MODES[mode] / 2))
   }


   handleClick(event){
     if (this.processing) return;
     let curNum = parseInt($(event.currentTarget).attr('num'))
     let curSet = parseInt($(event.currentTarget).attr('set'))
     let card = this.findCard(curNum, curSet)
     if(card.matched || card.revealed) return;
     card.reveal()
     if(this.PrevChosenCard === null){
       this.PrevChosenCard = card;
     } else {
        this.processing = true;
        setTimeout(this.checkPickedCard.bind(this, card) , 1500);
      }
    }



  checkPickedCard(card){
      this.checkForMatch(this.PrevChosenCard, card)
      this.PrevChosenCard = null;
      this.attemps++;
      this.processing = false;
      if(this.board.gameOver(this.deck))  this.ending();
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

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__card__ = __webpack_require__(3);


class Board {
  constructor(amount){
    this.deck_unshuffled = this.createDeck(amount);
    this.deck = this.shuffle(this.deck_unshuffled);
  }

  createDeck(amount){
    let deck = []
    for (let i = 1; i <= 2; i++) {
      for (let j = 1; j <= amount; j++) {
        deck.push(new __WEBPACK_IMPORTED_MODULE_0__card__["a" /* default */](j, i))
      }
    }
    return deck;
  }

  gameover(){

  }

  gameOver(deck){
    return deck.every( (card) => card.matched)
  }

  reset(deck){
    deck.forEach(card => {
      card.hide()
      card.matched = false
    })
  }

  shuffle(deck) {
      let counter = deck.length;
      while (counter > 0) {
          let index = Math.floor(Math.random() * counter);
          counter--;
          let temp = deck[counter];
          deck[counter] = deck[index];
          deck[index] = temp;
      }

      return deck;
  }



}



/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Card);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map