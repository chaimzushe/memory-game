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



class Game {

  constructor() {
    this.attemps = 0;
    this.modal = document.getElementById('modal');
     this.btnEasy = document.getElementById('level-easy');
     this.btnMedium = document.getElementById('level-medium');
     this.btnHard = document.getElementById('level-hard');
     this.p = document.getElementById('modal-p');
    this.modal.addEventListener('click', this.play.bind(this))
    this.previosClicked = null;
    this.PrevChosenCard = null;
    this.processing = false;
    this.mainContainer = document.getElementById('board');
    this.board = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */](10);
    this.deck = this.shuffle(this.board.deck)
    $(this.mainContainer).append('<ul id="board-ul"></ul>')
    $('#board-ul').on("click", "li", this.handleClick.bind(this) )
    $(this.btnEasy).on("click" , this.startEasyMode.bind(this)  )
    $(this.btnMedium).on("click" , this.startMediumMode.bind(this))
    $(this.btnHard).on("click" , this.startHardMode.bind(this)  )

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

  restart(level = 10){
    this.attemps = 0;
    $('#board-ul').empty()
    if(this.level !== 2){
      this.deck = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */](level).deck
    }
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
      return
    } else {
      this.previosClicked = card;
      this.revealCard(card)
      this.processing = true;
      setTimeout(this.checkPickedCard.bind(this, card) , 1000);

    }
   }


   startEasyMode(){
     this.p.innerHTML = `Enter Easy mode. The amount of cards of decreased to 10`
     this.modal.style.display = 'block';
     this.restart(5)
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

  startMediumMode(){
    this.p.innerHTML = `Enter Medium mode. The amount of cards stands at 20`
    this.modal.style.display = 'block';
    this.restart()
  }
  startHardMode(){
    this.p.innerHTML = `Enter Medium mode. The amount of cards stands at 30`
    this.modal.style.display = 'block';
    this.restart(15)
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

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__card__ = __webpack_require__(3);


class Board {
  constructor(amount){
    this.deck = this.createDeck(amount);
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