// Business Logic

// let totalScore = 0;//made global
// let roundScore = 0;

//Create player object
function Player(name) {
    this.name = name;
    this.totalScore = 0;
    this.roundScore = 0;
    this.playerTurn = false;
}


//get random number 1-6, add to roundscore if not 1
Player.prototype.diceRoll = function () {
    let roll = Math.floor(Math.random() * 6) + 1;
    if (roll === 1) {
        this.roundScore = 0;
        if (playerOne.playerTurn) {
            playerOne.playerTurn = false;
            playerTwo.playerTurn = true;
            displayTurn();
        } else if (playerTwo.playerTurn) {
            playerOne.playerTurn = true;
            playerTwo.playerTurn = false;
            displayTurn();
        }
    } else {
        this.roundScore += roll;
    }
}

//add roundscore to total score
Player.prototype.updateScore = function (roundScore) {
    this.totalScore = this.totalScore + this.roundScore;
    this.roundScore = 0;
    if (playerOne.playerTurn) {
        playerOne.playerTurn = false;
        playerTwo.playerTurn = true;
        displayTurn();
    } else if (playerTwo.playerTurn) {
        playerOne.playerTurn = true;
        playerTwo.playerTurn = false;
        displayTurn();
    }
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
    document.getElementById("create-player").addEventListener("submit", createPlayer);
    document.getElementById("pig-dice").addEventListener("submit", handleSubmission);
})

let playerOne; //Defining a player, setting to null
let playerTwo;
// playerOne.playerTurn = true;

function createPlayer(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const pTurn = document.getElementById("turn");
    const hideForm = document.getElementById("create-player");
    const p1 = document.getElementById("p1");
    const p2 = document.getElementById("p2");
    if (!playerOne) {
        playerOne = new Player(name);
        playerOne.playerTurn = true;
        p1.innerText = name;
    } else if (!playerTwo) {
        playerTwo = new Player(name);
        p2.innerText = name;
        hideForm.setAttribute("class", "hidden");
    } else {
        
        console.log("Stop breaking stuff");
    }
   
    if (playerOne.playerTurn === true) {
        pTurn.innerText = "It is " + playerOne.name + "'s turn";
    } else if (playerTwo.playerTurn === true) {
        pTurn.innerText = "It is " + playerTwo.name + "'s turn";
    }
}

function handleSubmission(e) {
    e.preventDefault();
    const holdOrRoll = document.getElementById("rollOrHold").value;
    const pTotal1 = document.getElementById("total-score-p1");
    const pRound1 = document.getElementById("round-score-p1");
    const pTotal2 = document.getElementById("total-score-p2");
    const pRound2 = document.getElementById("round-score-p2");

    const pTurn = document.getElementById("turn");
    if (playerOne.playerTurn === true) {
        // pTurn.innerText = "It is " + playerOne.name + "'s turn";
        if (holdOrRoll === "roll") {
            playerOne.diceRoll();
            console.log(playerOne.name, " clicked roll. Your total score is: ", playerOne.totalScore, "and your round score is: ", playerOne.roundScore);
            pRound1.innerText = "Round Score: " + playerOne.roundScore;
            pTotal1.innerText = "Total Score: " + playerOne.totalScore;
        } else {
            playerOne.updateScore();
            console.log(playerOne.name, " clicked hold. Your total score is: ", playerOne.totalScore, "and your round score is: ", playerOne.roundScore);
            pRound1.innerText = "Round Score: " + playerOne.roundScore;
            pTotal1.innerText = "Total Score: " + playerOne.totalScore;
        }
    } else if (playerTwo.playerTurn === true) {
        // pTurn.innerText = "It is " + playerTwo.name + "'s turn";
        if (holdOrRoll === "roll") {
            playerTwo.diceRoll();
            console.log(playerTwo.name, " clicked roll. Your total score is: ", playerTwo.totalScore, "and your round score is: ", playerTwo.roundScore);
            pRound2.innerText = "Round Score: " + playerTwo.roundScore;
            pTotal2.innerText = "Total Score: " + playerTwo.totalScore;
        } else {
            playerTwo.updateScore();
            console.log(playerTwo.name, " clicked hold. Your total score is: ", playerTwo.totalScore, "and your round score is: ", playerTwo.roundScore);
            pRound2.innerText = "Round Score: " + playerTwo.roundScore;
            pTotal2.innerText = "Total Score: " + playerTwo.totalScore;
        }
    }
}

function displayTurn() {
    const pTurn = document.getElementById("turn");
    if (playerOne.playerTurn) {
        pTurn.innerText = "It is " + playerOne.name + "'s turn.";
    } else if (playerTwo.playerTurn) {
        pTurn.innerText = "It is " + playerTwo.name + "'s turn.";
    }
}

// function handlePlayerTurn(player, )

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