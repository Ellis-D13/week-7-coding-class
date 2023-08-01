// for the card game WAR I will be creating 4 Classes and one Unit Test
// Class one - card class, represents a single card with properties for rank and suit 
// Class two - deck class, represents a deck of cards. Has properties to store the cards and methods for shuffling and dealing the cards
// Class three - player class, represents player, stores the players cards and keeps score, methods for playing a card
// Class four - gmae class, the game itself, methods for setting up the game, playing a turn, declaring a winner 
// Unit Test, testing one function using Mocha and Chai 

// Classes are the blueprint for creating objects. It holds the data for the object and methods to manipulate that data. 
// class is lowercase and uses curly braces which hold the properties and methods of the class lets manipulate muh hahahahaha

// CARD CLASS: a single card, rank and suit
class Card {
    //'constructor' is a method for creating and initializing an object created with a class. My Card class has two parameters
    //'suit' and 'rank'. They initialize the objects properites 
    constructor(suit, rank) {
        this.suit = suit; 
        this.rank = rank;
    }
}

// DECK CLASS: a deck of cards, methods for shuffeling and dealing the cards
class Deck {
    constructor() {
        this.cards = []; // an array to hold all of the cards
        let suits = ['hearts', 'diamonds', 'clubs', 'spades']; // all possible suits
        let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']; // all possible ranks
        // nested loops to create a new Card for each suit and rank, and add it to the deck
        for(let suit of suits) {
            for(let rank of ranks) {
                this.cards.push(new Card(suit, rank));
            }
        }
        this.shuffle(); // shuffle the deck after its created
    }

    // suffle method: shuffles the deck 
    shuffle() {
        // for loop 'for' allows you to execute a block of code multiple times
        // let i = this.cards.length -1 initalizes the loop, it is executed one time before the code block 
        // i > 0 = the condition for executing the code block, if true the loop continues and the code is executed, if false it ends
        //  here as long as i (index) is greater than 0 the loop will continue
        // i-- = ends the code line and removes the card from the index (-- a decrement operator)
        // this moves from front to back, if you run the loop forwards it can skip part of the index    
        for(let i = this.cards.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1)); // pick a random index
            // swap the current card with the randomly chosen card
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];

        }
    }

    // DEAL METHOD: removes and returns the top card of the deck
    deal() {
        //this.cards.length checks the current number of cards in the deck
        // ? creates an if-else statement: condition ? expression1 : expression2 if condition is true it evaluates
        // .. expression1; otherwise expression2 is evaluated
        //this.cards.pop(): if this.cards.length is true this line removes and returns the last card from the 'cards' array
        //pop() modifies the array in place and retuns the removed element
        //null - if the deck is empty this.cards.length is empty it returns null, indicating there are no more cards to deal
        return this.cards.length ? this.cards.pop() : null; 
    }
}
        // it is essential to make sure that the 'cards' array is working with cards prior to calling the deal() function
        //... or it may return 'null' where there are cards available to deal 
        
// Player Class: a player, properties for storing the cards, and keeping score and methods for playing a card
class Player {
    constructor(name) {
        this.name = name; // players name
        this.cards = []; // array to hold the cards
        this.score = 0; // players score
    }
    // PlayCard method: removes and returns the top card from players hand 
    playCard() {
        return this.cards.length ? this.cards.shift() : null; 
    }
}

// GAME CLASS: the game itself with methods for setting up the game, playing a turn and declaring the winner
class Game{
    constructor(player1, player2) {
        this.deck = new Deck(); // creates a new shuffled deck for the game
        this.players = [new Player(player1), new Player(player2)]; // creates the players 

        this.dealCards(); // deals cards to the players 
    }

    //DealCards method: deals 26 cards to each player
    dealCards() {
        while(this.deck.cards.length) {
            this.players[0].cards.push(this.deck.deal());
            this.players[1].cards.push(this.deck.deal());
            
        }
        }    
    playTurn() {
        let card1 = this.players[0].playCard(); // player 1 plays a card
        let card2 = this.players[1].playCard(); // player 2 plays a card

        // if both players have a card to play
        if(card1 && card2) {
            // log the cards that are played
            console.log(`${this.players[0].name} plays ${card1.rank} of ${card1.suit}`);
            console.log(`${this.players[1].name} plays ${card2.rank} of ${card2.suit}`);

            // Determine the order of ranks
      const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
      // Compare the ranks of the two cards
      // If Player 1's card is of a higher rank, they win the round
      if(ranks.indexOf(card1.rank) > ranks.indexOf(card2.rank)) {
        this.players[0].score++;
        console.log(`${this.players[0].name} wins the round\n`);
      } 
      // If Player 2's card is of a higher rank, they win the round
      else if(ranks.indexOf(card1.rank) < ranks.indexOf(card2.rank)) {
        this.players[1].score++;
        console.log(`${this.players[1].name} wins the round\n`);
      } 
      // If the cards are of the same rank, it's a draw
      else {
        console.log('The round is a draw\n');
      }
    }
}
// DeclareWinner method: declares the winner based on the players' scores
declareWinner() {
    // If Player 1 has more points, they win
    if(this.players[0].score > this.players[1].score) {
      console.log(`${this.players[0].name} wins the game with a score of ${this.players[0].score}`);
    } 
    // If Player 2 has more points, they win
    else if(this.players[0].score < this.players[1].score) {
      console.log(`${this.players[1].name} wins the game with a score of ${this.players[1].score}`);
    } 
    // If the players have the same number of points, it's a draw
    else {
      console.log('The game is a draw');
    }
  }

  // Start method: begins the game and continues to play turns until all cards have been played, then declares a winner
  start() {
    while(this.players[0].cards.length && this.players[1].cards.length) {
      this.playTurn();
    }

    this.declareWinner();
  }
}

// Start a new game with two players named 'Neo' and 'Trinity'
const game = new Game('Neo', 'Trinity');
game.start();

