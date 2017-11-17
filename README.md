

# Memory Puzzle

[Live link](https://chaimzushe.github.io/memory-game/)

### Memory Card Game

Memory Cards, also known as Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs, is a card game in which all of the cards are laid face down on a surface and two cards are flipped face up over each turn. The object of the game is to turn over pairs of matching cards. Memory Cards can be played with any number of players or as solitaire. It is a particularly good game for young children, though adults may find it challenging and stimulating as well. The scheme is often used in quiz shows and can be employed as an educational game.

 <img width="1092" alt="screen shot 2017-09-13 at 1 26 08 pm" src="https://user-images.githubusercontent.com/20543351/30391436-523493a0-9887-11e7-95ce-04cd31cb0308.png">


### Rules

 Matching cards are removed from the game when paired
 Any deck of playing cards may be used, although there are also commercial sets of cards with images. The rules given here are for a standard deck of 52 cards, which are normally laid face down in four rows of 13 cards each. The two jokers may be included for a total of six rows of nine cards each.

 Additional packs can be used for added interest. Standard rules need not be followed: the cards can be spread out anywhere, such as all around the room on a freshly-vacuumed carpet, again for added interest.

 In turn, each player chooses two cards and turns them face up. If they are of the same rank and color (e.g. six of hearts and six of diamonds, queen of clubs and queen of spades, or both jokers, if used) then that player wins the pair and plays again. If they are not of the same rank and color, they are turned face down again and play passes to the player on the left. Rules can be changed here too: it can be agreed before the game starts that matching pairs be any two cards of the same rank, a color-match being unnecessary, or that the match must be both rank and card suit.

 The game ends when the last pair has been picked up. The winner is the person with the most pairs. There may be a tie for first place.


### Strategy

Over the course of the game, it becomes known where certain cards are located, and so upon turning up one card, players with good memory will be able to remember where they have already seen its pair.

It is common for many players to think they know where pairs are and to turn over the one they are sure of first, then be stumped finding its mate. A better strategy is to turn over a less certain card first, so that if wrong, one knows not to bother turning a more certain card over.

An ideal strategy can be developed if we assume that players have perfect memory. For the One Flip variation below, this strategy is fairly simple. Before any turn in the game, there are t cards still in play, and n cards still in play but of known value. The current player should flip over an unknown card. If this card matches one of the known cards, the match is next chosen. Less obviously, if the card does not match any known card, one of the n known cards should still be chosen to minimize the information provided to other players. The mathematics follow:

If a remaining unknown card is chosen randomly, there is a 1/(t−1−n) chance of getting a match, but also a n/(t−1−n) chance of providing opponents with the information needed to make a match.

There are some exceptions to this rule that apply on the fringe cases, where n = 0 or 1 or towards the end of the game.

###### [See here for more raeding](https://en.wikipedia.org/wiki/Concentration_(game)



### Functionality

- Animated rendering and flipping of the cards.
- Choice of easy, medium and hard levels.
- Tracking of amount of guesses.
- Firework animation game winning.  


### Architecture and Technologies

This game was designed using JavaScript, jQuery, HTML, CSS.

The games structure is Object Oriented. divided as follows:

- Card object.
Responsible for:
  - Maintaining the cards unique identity (icon, set number)
  - Maintaining the cards representational class in the DOM
  - Swapping states from hidden to revealed
  - Keeping track of the cards 'was matched?' state

- Board object.
Responsible for:
  - Creating the deck of cards.
  - Reseting the cards at the end of the game.
  - Checking if the game is over (all the cards are matched).

- Game object.
Responsible for:
  - Rendering the modal, and winning gif.
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
  - Highest score
  - Play against the computer
  - Play against a timer
