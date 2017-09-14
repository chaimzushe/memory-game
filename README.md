

# Memory Puzzle

[Live link](https://chaimzushe.github.io/memory-game/)

### Background

 - memory puzzle is a fun educational game that sharpens the memory. The player is asked to memorize a card's location on the board for a very long time after the cards uniq identity is hidden. While the player finds the match he is encouraged to commit more potential card matches to memory.

 <img width="1092" alt="screen shot 2017-09-13 at 1 26 08 pm" src="https://user-images.githubusercontent.com/20543351/30391436-523493a0-9887-11e7-95ce-04cd31cb0308.png">




### Libraries and APIs

The game uses JavaScript, jQuery, HTML5, and CSS3.


### Functionality

- Animated rendering the cards.
- Animated flipping of the cards.
- Easy, medium and hard levels. (how many cards are rendered).
- Game keeps track of the amount of guesses.
- Firework animation for winners of the game.  


### Architecture and Technologies

This game was designed using JavaScript, jQuery, HTML, CSS.

The games structure is Object Oriented. divided as follows:

- Card object.
Responsible for:
  - Maintaining the cards unique identity (icon, set number).
  - Maintaining the cards representational class in the DOM.
  - Swapping states from hidden to revealed.
  - Keeping track of the cards 'was matched?' state.  

- Board object.
Responsible for:
  - Creating the deck of cards.
  - Reseting the cards at the end of the game.
  - Checking if the game is over (all the cards are matched).

- Game object.
Responsible for:
  - Rendering the model, and winning gif.
  - Handling user interaction.

``` javascript

processGuess(card){
  if(this.PrevChosenCard === null){ // this is the first card picked. cant compare to a second
    this.PrevChosenCard = card;
  } else {
    this.attemps++;
   if(card.isMatch(this.PrevChosenCard)) { // hit a match.
     this.PrevChosenCard.matched = true;
      card.matched = true;
      this.PrevChosenCard = null;
      if(this.board.gameOver(this.deck)) this.ending();
    } else {
      this.processing = true;
      setTimeout(this.hideCards.bind(this, card) , 1500);
    }

  }
}

```

### to come...
  - Highest score.
  - Play against the computer.
  - Play against a timer.
