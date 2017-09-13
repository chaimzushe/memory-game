

# Memory Puzzle

### Background

 - memory puzzle is a fun educational game that sharpens the memory. The player is asked to memorize a card's location on the board for a very long time after the cards uniq identity is hidden. While the player finds the match he is encouraged to commit more potential card matches to memory.

 <img width="1092" alt="screen shot 2017-09-13 at 1 26 08 pm" src="https://user-images.githubusercontent.com/20543351/30391436-523493a0-9887-11e7-95ce-04cd31cb0308.png">




### Libraries and APIs

the app uses javascript with jQuery to manipulate the DOM and HTML5 for layout. CSS3 for styling.


###Functionality

- animated rendering the cards.
- animated flipping of the cards.
- Easy, medium and hard levels. (How many cards are rendered)
- firework animation for winners of the game.  


### Architecture and Technologies

This game was fashioned using mostly 'vanilla' JavaScript, a little jQuery, html, css.

The games structure is Object Oriented. divided as follows:

- Card object. Responsible for:
  - Maintaining uniq identity (icon, set).
  - Representational value in the DOM.
  - Swapping states from hidden to revealed.
  - Keeping track of the cards 'was matched?' state.  

- Board object. Responsible for:
  - Creating and shuffling the deck of cards.
  - Reseting the cards at the end of the game.
  - Checking if the game is over (all cards are matched).

- Game object. Responsible for:
  - Rendering the model, and winning gif, prior and after the game.
  - Handling the users interaction. (clicking on a card) to check for a match.  



### to come...
  - Highest score.
  - Play against the computer.
  - Play against a timer. 
