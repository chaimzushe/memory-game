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
    this.PrevChosenCard = null;
    this.mainContainer = document.getElementById('board');
    this.board = new __WEBPACK_IMPORTED_MODULE_0__board__["a" /* default */]();
    this.deck = this.shuffle(this.board.deck)
    $(this.mainContainer).append('<ul id="board-ul"></ul>')
    this.renderCards()
    $('#board-ul').on("click", "li", this.handleClick.bind(this) )

  }

  

  renderCards(){
    this.boardUl = document.getElementById('board-ul');
    $(this.boardUl).empty()
    for (let i = 0; i < this.deck.length; i++) {
      let card = this.deck[i]
      if(card.revealed) {
        $(this.boardUl).append(`<li set=${card.set} num=${card.num} id='card${card.num}'> </li>`)
      } else {
        $(this.boardUl).append(`<li id='hidden_card' set=${card.set} num=${card.num}>  </li>`)
      }
    }
  }

  handleClick(event){
    let curNum = parseInt($(event.target).attr('num'))
    let curSet = parseInt($(event.target).attr('set'))
    let card = this.findCard(curNum, curSet)
    if(card.matched){
      return
    }
    if(card === this.PrevChosenCard){
      alert("Don't click on the same card...")
    } else {
      card.revealed = true;
      this.PrevChosenCard = card;
      this.renderCards()
      setTimeout(this.checkPickedCard.bind(this, card) , 1000);
    }
  }

  checkPickedCard(card){

    if(this.PrevChosenCard === null){

    } else {
      this.checkForMatch(this.PrevChosenCard, card)
    }
  }

  checkForMatch(prevoiusCard, card){

    if(prevoiusCard.isMatch(card)){
      prevoiusCard.matched = true;
      prevoiusCard.revealed = true;
      card.matched = true;
      card.revealed = true;
      this.PrevChosenCard = null;
    } else {
      prevoiusCard.hide()
      card.hide()
      this.PrevChosenCard = null;
      this.renderCards()

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
  constructor(){
    this.deck = this.createDeck();
  }

  createDeck(){
    let deck = []
    for (let i = 1; i <= 2; i++) {
      for (let j = 1; j <= 14; j++) {
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

/* harmony default export */ __webpack_exports__["a"] = (Card);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map