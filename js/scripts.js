// Business Logic

// let totalScore = 0;//made global
// let roundScore = 0;

//Create player object
function Player(name) {
    this.name = name;
    this.totalScore = 0;
    this.roundScore = 0;
    this.playerTurn = true;
}


//get random number 1-6, add to roundscore if not 1
Player.prototype.diceRoll = function () {
    let roll = Math.floor(Math.random() * 6) + 1;
    if (roll === 1) {
        // this.roundScore = 0;
        this.playerTurn = false;
    } else {
        this.roundScore += roll;
    }
}

//add roundscore to total score
Player.prototype.updateScore = function (roundScore) {
    this.totalScore = this.totalScore + this.roundScore;
    this.roundScore = 0;
}

// function diceRoll() {//Uses math functions to simulate rolling a die
//     let roll = Math.floor(Math.random() * 6) + 1;
//     if (roll === 1) {
//         roundScore = 0;
//     } else {
//         roundScore += roll;
//     }
// }




// Player.prototype.addRoundScore = function (roundScore) {
//     this.score = this.score + roundScore;
// };

function changePlayer() {
    if (playerTurn === false) {
        playerTurn = true;
    } else if (playerTurn === true) {
        playerTurn = false
    }
    let roundScore = 0;
    let myResult = playerTurn;
    return myResult;

}

// UI Logic
// myPlayer = new Player("NameOne", 0);//For testing

window.addEventListener("load", function () {
    this.document.getElementById("pig-dice").addEventListener("submit", handleSubmission);
})

let playerOne = null; //Defining a player, setting to null

function handleSubmission(e) {
    e.preventDefault();
    const holdOrRoll = document.getElementById("rollOrHold").value;
    const name = document.getElementById("name").value;
    const pTotal = document.getElementById("total-score");
    const pRound = document.getElementById("round-score");

    if (!playerOne) {//Create a new player IF there isn't a player
        playerOne = new Player(name);
    }

    if (holdOrRoll === "roll") {
        playerOne.diceRoll();
        console.log(playerOne.name, " clicked roll. Your total score is: ", playerOne.totalScore, "and your round score is: ", playerOne.roundScore);
    } else {
        playerOne.updateScore();
        console.log(playerOne.name, " clicked hold. Your total score is: ", playerOne.totalScore, "and your round score is: ", playerOne.roundScore);
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

