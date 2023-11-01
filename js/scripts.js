// Business Logic

Player.prototype.diceRoll()

function diceRoll() {//Uses math functions to simulate rolling a die
  return Math.floor(Math.random() * 6) + 1;
}

function Player(name, score, roundScore) {
  this.name = name;
  this.score = 0;
  this.roundScore = 0;
}

Player.prototype.roundScore(dieRoll) {

}

Player.prototype.addRoundScore = function(roundScore) {
  this.score = this.score + roundScore;
};

function changePlayer () {
  if (playerTurn === false) {
    playerTurn = true;
} else if (playerTurn === true) {
  playerTurn = false
}
let roundScore = 0;
let myResult = playerTurn;
return myResult;
  
}

function roundScore() {
    let roundScore = 0;
    if (dieNumber !== 1) {
        roundScore += dieNumber;
    } else {
        roundScore = 0;
    }
}


// UI Logic
myPlayer = new Player("NameOne", 0);//For testing

window.addEventListener("load", function() {
    this.document.getElementById("pig-dice").addEventListener("submit", handleSubmission);
})

function handleSubmission(e) {
    e.preventDefault();
    const holdOrRoll = document.getElementById("rollOrHold").value;
    const name = document.getElementById("name").value;
    const pTotal = document.getElementById("total-score");
    const pRound = document.getElementById("round-score");
    if (holdOrRoll === "roll") {
        let roll = diceRoll();
        let roundScore = roundScore(roll);
        addRoundScore(roundScore);
        
    }
}


//REFERENCE

// let count = 0;

// while (count < 5) {
//   console.log("Count: " + count);
//   count++; // Increment the count in each iteration
// }
// let roundScore = 0;
// while (dieRoll !== 1 && holdScore !== true) {
//     roundScore += dieRoll;
// }

