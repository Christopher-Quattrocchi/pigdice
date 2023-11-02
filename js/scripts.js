// Business Logic

//Create player object
function Player(name) {
    this.name = name;
    this.totalScore = 0;
    this.roundScore = 0;
    this.playerTurn = false;
    this.playerVictory = false;
}

//get random number 1-6, add to roundscore if not 1
Player.prototype.diceRoll = function () {
    displayRoll = document.getElementById("roll")
    let roll = Math.floor(Math.random() * 6) + 1;
    if (roll === 1) {
        displayRoll.innerText = "You rolled a: " + roll;
        this.roundScore = 0;
        changePlayer();
    } else {
        displayRoll.innerText = "You rolled a: " + roll;
        this.roundScore += roll;
    }
}

//add roundscore to total score
Player.prototype.updateScore = function (roundScore) {
    this.totalScore = this.totalScore + this.roundScore;
    this.roundScore = 0;
    changePlayer();
}

function changePlayer() {
    playerOne.playerTurn = !playerOne.playerTurn;
    if (playerTwo) {
        playerTwo.playerTurn = !playerTwo.playerTurn;
    }
    if (computerOpponent) {
        computerOpponent.playerTurn = !computerOpponent.playerTurn;
    }
    displayTurn();
}

function computerStrategy() {
    const p2 = document.getElementById("p2");
    const pTotal2 = document.getElementById("total-score-p2");
    const pRound2 = document.getElementById("round-score-p2");
    p2.innerText = "Player Two: " + computerOpponent.name;

    const interval = setInterval(() => {
        // Check if it's the computer's turn
        if (computerOpponent.playerTurn) {
            if (computerOpponent.roundScore > 20 || !computerOpponent.playerTurn) {
                clearInterval(interval);
                if (computerOpponent.playerTurn) {
                    computerOpponent.updateScore();
                    pRound2.innerText = "Round Score: " + computerOpponent.roundScore;
                    pTotal2.innerText = "Total Score: " + computerOpponent.totalScore;
                    
                }
            } else {
                computerOpponent.diceRoll();
                pRound2.innerText = "Round Score: " + computerOpponent.roundScore;
                pTotal2.innerText = "Total Score: " + computerOpponent.totalScore;
                computerOpponent.victoryCheck()
                if (computerOpponent.playerVictory) {
                    victory.innerText = computerOpponent.name + " Victory! Winner Winner Chicken Dinner!!";
                    hideMe.setAttribute("class", "hidden");
    
                }
            }
        }
    }, 1000);
}


// UI Logic
// myPlayer = new Player("NameOne", 0);//For testing

window.addEventListener("load", function () {
    document.getElementById("create-player").addEventListener("submit", createPlayer);
    document.getElementById("pig-dice").addEventListener("click", handleSubmission);
    document.getElementById("computer-player").addEventListener("click", startWithComputer);

})

let playerOne; //Defining a player, setting to null
let playerTwo;
let computerOpponent;

function startWithComputer(e) {
    e.preventDefault();
    document.getElementById("create-player").setAttribute("class", "hidden");
    document.getElementById("computer-player").setAttribute("class", "hidden");
    computerOpponent = new Player("Skynet");
    displayTurn();
    if (computerOpponent.playerTurn) {

    }
}

function createPlayer(e) {
    e.preventDefault();
    form = document.getElementById("pig-dice");
    const name = document.getElementById("name").value;
    const pTurn = document.getElementById("turn");
    const hideForm = document.getElementById("create-player");
    const p1 = document.getElementById("p1");
    const p2 = document.getElementById("p2");
    form.setAttribute("class", "not-hidden");
    if (!playerOne) {
        playerOne = new Player(name);
        playerOne.playerTurn = true;
        document.getElementById("computer-player").setAttribute("class", "hideme");
        document.getElementById("create-button").innerText = "Create Player 2";
        p1.innerText = "Player one: " + name;
    } else if (!playerTwo) {
        playerTwo = new Player(name);
        p2.innerText = "Player two: " + name;
        hideForm.setAttribute("class", "hidden");
        document.getElementById("computer-player").setAttribute("class", "hidden");

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
    const hideMe = document.getElementById("hideme");
    const holdbutton = document.getElementById("holdbutton");
    const rollbutton = document.getElementById("rollbutton");
    const pTotal1 = document.getElementById("total-score-p1");
    const pRound1 = document.getElementById("round-score-p1");
    const pTotal2 = document.getElementById("total-score-p2");
    const pRound2 = document.getElementById("round-score-p2");
    const victory = document.getElementById("victory");



    if (playerOne.playerTurn === true) {
        if (e.target === rollbutton) {
            playerOne.diceRoll();
            console.log(playerOne.name, " clicked roll. Your total score is: ", playerOne.totalScore, "and your round score is: ", playerOne.roundScore);
            pRound1.innerText = "Round Score: " + playerOne.roundScore;
            pTotal1.innerText = "Total Score: " + playerOne.totalScore;
        } else if (e.target === holdbutton) {
            playerOne.updateScore();
            console.log(playerOne.name, " clicked hold. Your total score is: ", playerOne.totalScore, "and your round score is: ", playerOne.roundScore);
            pRound1.innerText = "Round Score: " + playerOne.roundScore;
            pTotal1.innerText = "Total Score: " + playerOne.totalScore;
            playerOne.victoryCheck()
            if (playerOne.playerVictory) {
                victory.innerText = playerOne.name + " Victory! Winner Winner Chicken Dinner!!";
                hideMe.setAttribute("class", "hidden");

            }
        }
    } else if (playerTwo && playerTwo.playerTurn === true) {
        if (e.target === rollbutton) {
            playerTwo.diceRoll();
            console.log(playerTwo.name, " clicked roll. Your total score is: ", playerTwo.totalScore, "and your round score is: ", playerTwo.roundScore);
            pRound2.innerText = "Round Score: " + playerTwo.roundScore;
            pTotal2.innerText = "Total Score: " + playerTwo.totalScore;
        } else if (e.target === holdbutton) {
            playerTwo.updateScore();
            console.log(playerTwo.name, " clicked hold. Your total score is: ", playerTwo.totalScore, "and your round score is: ", playerTwo.roundScore);
            pRound2.innerText = "Round Score: " + playerTwo.roundScore;
            pTotal2.innerText = "Total Score: " + playerTwo.totalScore;
            playerTwo.victoryCheck();
            if (playerTwo.playerVictory) {
                victory.innerText = playerTwo.name + " Victory! Winner Winner Chicken Dinner!!";
                hideMe.setAttribute("class", "hidden");
            }
        }
    } else if (computerOpponent && computerOpponent.playerTurn) {
        computerStrategy();
    }
}

function displayTurn() {
    const pTurn = document.getElementById("turn");
    if (playerOne.playerTurn) {
        pTurn.innerText = "It is " + playerOne.name + "'s turn.";
    } else if (playerTwo && playerTwo.playerTurn) {
        pTurn.innerText = "It is " + playerTwo.name + "'s turn.";
    } else if (computerOpponent && computerOpponent.playerTurn) {
        pTurn.innerText = "It is " + computerOpponent.name + "'s turn";
    }
}

Player.prototype.victoryCheck = function () {
    if (this.totalScore >= 100) {
        this.playerVictory = true;
    } else {
        this.playerVictory = false;
    }
}
