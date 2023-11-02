// Business Logic

//Create player object
function Player(name) {
    this.name = name;
    this.totalScore = 0;
    this.roundScore = 0;
    this.playerTurn = false;//for player one, this will be set to true initially
    this.playerVictory = false;
}

//get random number 1-6, add to roundscore if not 1
Player.prototype.diceRoll = async function () {
    const displayRoll1 = document.getElementById("roll1")
    const displayRoll2 = document.getElementById("roll2")
    const pTotal1 = document.getElementById("total-score-p1");
    const pRound1 = document.getElementById("round-score-p1");
    const pTotal2 = document.getElementById("total-score-p2");
    const pRound2 = document.getElementById("round-score-p2");
    const match = document.getElementById("match");
    const wipeout = document.getElementById("wipeout");

    let roll1 = Math.floor(Math.random() * 6) + 1;
    let roll2 = Math.floor(Math.random() * 6) + 1;

    displayRoll1.innerText = this.name + " rolled a: " + roll1;
    displayRoll2.innerText = this.name + " rolled a: " + roll2;

    if (roll1 === 1 && roll2 === 1) {//check for total wipeout
        this.roundScore = 0;
        this.totalScore = 0;
        wipeout.innerText = this.name + " got wiped out! Total set to 0";
        await delay(1000);
        updateDisplay(this, pTotal1, pRound1, pTotal2, pRound2);
        wipeout.innerText = "";
        changePlayer();
    } else if (roll1 === 1 || roll2 === 1) {//check for round wipeout
        this.roundScore = 0;
        wipeout.innerText = this.name + " rolled a one. Bad luck!"
        updateDisplay(this, pTotal1, pRound1, pTotal2, pRound2);
        await delay(1000);
        wipeout.innerText = "";
        changePlayer();
    } else if (roll1 === roll2) {//check for mandatory additional roll
        this.roundScore = roll1 + roll2;
        console.log("same number, should autoroll again");
        match.innerText = "MATCH. Auto-roll";
        updateDisplay(this, pTotal1, pRound1, pTotal2, pRound2);
        await delay(1000);
        this.diceRoll()
        match.innerText = "";
        await delay(1000);
    } else {//no special conditions
        this.roundScore += roll1 + roll2;
        updateDisplay(this, pTotal1, pRound1, pTotal2, pRound2);
    }
}

function updateDisplay(player, pTotal1, pRound1, pTotal2, pRound2) {//make sure that the current score is shown
    if (playerOne === player) {
        pRound1.innerText = "Round Score: " + player.roundScore;
        pTotal1.innerText = "Total Score: " + player.totalScore;
    } else if (playerTwo === player || computerOpponent === player) {
        pRound2.innerText = "Round Score: " + player.roundScore;
        pTotal2.innerText = "Total Score: " + player.totalScore;
    }
}

//add roundscore to total score
Player.prototype.updateScore = function () {//update score when player or computer chooses to hold
    this.totalScore = this.totalScore + this.roundScore;
    this.roundScore = 0;
}

function changePlayer() {//switch turns by flipping booleans, display whose turn it is
    playerOne.playerTurn = !playerOne.playerTurn;
    displayTurn();
    if (playerTwo) {
        playerTwo.playerTurn = !playerTwo.playerTurn;
        displayTurn();
    } else if (computerOpponent) {
        computerOpponent.playerTurn = !computerOpponent.playerTurn;
        computerStrategy();//check to see if this actually does something. currently it calls an async function without await
        console.log("computerStrategy called in changePlayer");
    }
    displayTurn();
}

//reference
function delay(ms) {//so we can add delays more consistently than with setinterval which sucks
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function computerStrategy() {//defines computer player behavior 
    if (!computerOpponent.playerTurn) return;
    const rollButton = document.getElementById("rollbutton");
    const holdButton = document.getElementById("holdbutton");
    const pTotal1 = document.getElementById("total-score-p1");
    const pTotal2 = document.getElementById("total-score-p2");
    const pRound1 = document.getElementById("round-score-p1");
    const pRound2 = document.getElementById("round-score-p2");
    const victory = document.getElementById("victory");
    const hideMe = document.getElementById("hideme");

    rollButton.disabled = true;//disable buttons so the player can't mess with the computer's turn
    holdButton.disabled = true;
    console.log("should be disabled");

    while (computerOpponent.playerTurn && computerOpponent.totalScore < 100 && computerOpponent.roundScore < 20) {//while loop so the comp keeps rolling unless conditions are met
        await computerOpponent.diceRoll();
        updateDisplay(computerOpponent, pTotal1, pRound1, pTotal2, pRound2);
        await delay(1000);
    }
    if (computerOpponent.roundScore >= 20) {//computer will hold if it has 20 or more current points
        computerOpponent.updateScore();
        updateDisplay(computerOpponent, pTotal1, pRound1, pTotal2, pRound2);
        console.log("computer held, screen should be updated");
        await delay(1000);
        computerOpponent.victoryCheck();//check if comp won
        if (computerOpponent.playerVictory) {
            victory.innerText = computerOpponent.name + " Victory! Winner Winner Chicken Dinner!!";
            hideMe.setAttribute("class", "hidden");
        } else {
            changePlayer();//if comp hasn't won, it becomes player turn
        }
    }
    rollButton.disabled = false;//reenable buttons so player can click
    holdButton.disabled = false;
    console.log("Should be enabled");
    console.log("end of computerStrategy");
}

// UI Logic
window.addEventListener("load", function () {//wait for load, set event listeners
    document.getElementById("create-player").addEventListener("submit", createPlayer);
    document.getElementById("pig-dice").addEventListener("click", handleSubmission);
    document.getElementById("computer-player").addEventListener("click", startWithComputer);
})

let playerOne; //Defining a player so the code doesn't have a freakout. set to null until they're created with values
let playerTwo;
let computerOpponent;

function startWithComputer(e) {//this starts the game if you select computer
    e.preventDefault();
    const form = document.getElementById("pig-dice");
    document.getElementById("create-player").setAttribute("class", "hidden");//hides stuff so the player doesn't screw with it
    document.getElementById("computer-player").setAttribute("class", "hidden");
    computerOpponent = new Player("Skynet");
    form.setAttribute("class", "not-hidden");//allow player to access buttons after the computer player is created
    const p2 = document.getElementById("p2");
    displayTurn();
    p2.innerText = "Player Two: " + computerOpponent.name;
}

function createPlayer(e) {
    e.preventDefault();
    const form = document.getElementById("pig-dice");
    const name = document.getElementById("name").value;
    const pTurn = document.getElementById("turn");
    const hideForm = document.getElementById("create-player");
    const p1 = document.getElementById("p1");
    const p2 = document.getElementById("p2");
    if (!playerOne) {//create player one
        playerOne = new Player(name);
        playerOne.playerTurn = true;
        document.getElementById("computer-player").setAttribute("class", "hideme");
        document.getElementById("create-button").innerText = "Create Player 2";
        p1.innerText = "Player one: " + playerOne.name;
    } else if (!playerTwo) {//create player two
        playerTwo = new Player(name);
        p2.innerText = "Player two: " + playerTwo.name;
        hideForm.setAttribute("class", "hidden");
        form.setAttribute("class", "not-hidden");
        document.getElementById("computer-player").setAttribute("class", "hidden");
    } else {
        console.log("Stop breaking stuff");//I don't think that this can be triggered, but if so it means something broke
    }
    if (playerOne.playerTurn === true) {//this code is probably unnecessary. see if it breaks without me later
        pTurn.innerText = "It is " + playerOne.name + "'s turn";
    } else if (playerTwo.playerTurn === true) {
        pTurn.innerText = "It is " + playerTwo.name + "'s turn";
    }
}

async function handleSubmission(e) {
    e.preventDefault();
    const hideMe = document.getElementById("hideme");
    const holdbutton = document.getElementById("holdbutton");
    const rollbutton = document.getElementById("rollbutton");
    const pTotal1 = document.getElementById("total-score-p1");
    const pRound1 = document.getElementById("round-score-p1");
    const pTotal2 = document.getElementById("total-score-p2");
    const pRound2 = document.getElementById("round-score-p2");
    const victory = document.getElementById("victory");

    if (playerOne.playerTurn === true) {//logic that determines how a two player game works. later, try to refactor me so that I'm not all in this function
        if (e.target === rollbutton) {
            await playerOne.diceRoll();
        } else if (e.target === holdbutton) {
            playerOne.updateScore();
            updateDisplay(playerOne, pTotal1, pRound1, pTotal2, pRound2);
            playerOne.victoryCheck()
            if (playerOne.playerVictory) {
                victory.innerText = playerOne.name + " Victory! Winner Winner Chicken Dinner!!";
                hideMe.setAttribute("class", "hidden");
            } else {
                changePlayer();
            }
        }
    } else if (playerTwo && playerTwo.playerTurn === true) {
        if (e.target === rollbutton) {
            await playerTwo.diceRoll();
        } else if (e.target === holdbutton) {
            playerTwo.updateScore();
            updateDisplay(playerTwo, pTotal1, pRound1, pTotal2, pRound2);
            playerTwo.victoryCheck();
            if (playerTwo.playerVictory) {
                victory.innerText = playerTwo.name + " Victory! Winner Winner Chicken Dinner!!";
                hideMe.setAttribute("class", "hidden");
            } else {
                changePlayer();
            }
        }
    } else if (computerOpponent && computerOpponent.playerTurn) {//start comp strategy if computer game
        computerStrategy();
        console.log("computerStrategy called in handleSubmission");
    }
}

function displayTurn() {//show user which player is active
    const pTurn = document.getElementById("turn");
    if (playerOne.playerTurn) {
        pTurn.innerText = "It is " + playerOne.name + "'s turn.";
    } else if (playerTwo && playerTwo.playerTurn) {
        pTurn.innerText = "It is " + playerTwo.name + "'s turn.";
    } else if (computerOpponent && computerOpponent.playerTurn) {
        pTurn.innerText = "It is " + computerOpponent.name + "'s turn";
    }
}

Player.prototype.victoryCheck = function () {//check for victory
    if (this.totalScore >= 100) {
        this.playerVictory = true;
    } else {
        this.playerVictory = false;
    }
}