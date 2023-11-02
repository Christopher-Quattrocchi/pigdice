let createPlayerForm;
let createComputerPlayerButton;
let playerInfoContainer;
let mainGameForm;
let rollButton;
let holdButton;
let playerName;

class Player {
    constructor(name, isComputer = false) {
        this.name = name;
        this.totalScore = 0;
        this.roundScore = 0;
        this.isComputer = isComputer;
        this.playerInfoDiv = document.createElement('div');
        this.playerInfoDiv.classList.add('player');
        this.updateDisplay();
    }

    updateDisplay() {
        this.playerInfoDiv.innerHTML = `
        <h2>${this.name}</h2>
        <p>Round Score: ${this.roundScore}</p>
        <p>Total Score: ${this.totalScore}</p>`;
    }
}

class Game {
    constructor() {
        this.currentPlayerIndex = 0;
        this.players = [];
        this.state = 'playerCreation';
        this.stateObservers = [];
        this.playerAddedObservers = [];
        this.playerChangedObservers = [];
    }

    addPlayer(player) {
        this.players.push(player);
        if (this.getPlayerCount() === 2) {
            this.changeState('playing');
        }
        this.playerAddedObservers.forEach(function(observer) {
            observer(player);
        });
    }

    addNewPlayerObserver(observer) {
        this.playerAddedObservers.push(observer);
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    switchPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.getPlayerCount();
        const currentPlayer = this.getCurrentPlayer();
        this.playerChangedObservers.forEach(function(observer) {
            observer(currentPlayer);
        });
        this.getCurrentPlayer().roundScore = 0;
    }

    addPlayerChangedObserver(observer) {
        this.playerChangedObservers.push(observer);
    }

    getPlayerCount() {
        return this.players.length;
    }

    addStateObserver(observer) {
        this.stateObservers.push(observer);
    }

    changeState(newState) {
        const oldState = this.state;
        this.state = newState;
        this.stateObservers.forEach(function(observer) {
            observer(oldState, newState);
        });
    }

    getDiceRoll() {
        return Math.ceil(Math.random() * 6);
    }

    roll() {
        const roll1 = this.getDiceRoll();
        const roll2 = this.getDiceRoll();

        this.getCurrentPlayer().roundScore += roll1 + roll2;
        this.getCurrentPlayer().updateDisplay();
    }

    hold() {
        this.getCurrentPlayer().totalScore += this.getCurrentPlayer().roundScore;
        this.getCurrentPlayer().roundScore = 0;
        this.getCurrentPlayer().updateDisplay();
        this.switchPlayer();
    }
}

const game = new Game();

game.addStateObserver(function(oldState, newState) {
    if (oldState === 'playerCreation') {
        createComputerPlayerButton.classList.add('hidden');
        createPlayerForm.classList.add('hidden');
    }
});

game.addStateObserver(function (oldState, newState) {
    if (newState === 'playing') {
        mainGameForm.classList.remove('hidden');
        document.getElementById('turn').classList.remove('hidden');
        playerName.innerHTML = game.getCurrentPlayer().name;
    }
});

game.addNewPlayerObserver(function(player) {
    playerInfoContainer.appendChild(player.playerInfoDiv);
});

game.addPlayerChangedObserver(function() {
    playerName.innerHTML = game.getCurrentPlayer().name;
});


window.addEventListener('load', function () {
    createComputerPlayerButton = document.getElementById('computer-player');
    createComputerPlayerButton.addEventListener('click', function(event) {
        event.preventDefault();
        const computerPlayer = new Player('Skynet', true);
        game.addPlayer(computerPlayer);
    });

    createPlayerForm = document.getElementById('create-player');
    createPlayerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const player = new Player(name);
        game.addPlayer(player);
    });

    playerInfoContainer = document.getElementById('player-info');

    mainGameForm = document.getElementById('pig-dice');

    rollButton = document.getElementById('rollbutton');
    rollButton.addEventListener('click', function(event) {
        event.preventDefault();
        game.roll();
    });

    holdButton = document.getElementById('holdbutton');
    holdButton.addEventListener('click', function (event) {
        event.preventDefault();
        game.hold();
    });

    playerName = document.getElementById('current-player-name');
});

// //Reference
// // Here's a quick example where I extracted the updating of the "You rolled a" HTML to use this kind of model:

// const rollObservers = [];

// rollObservers.push(function(roll1, roll2) {
//     displayRoll1.innerText = this.name + " rolled a: " + roll1;
//     displayRoll2.innerText = this.name + " rolled a: " + roll2;
// });

// function getDiceRoll() {
//     return Math.floor(Math.random() * 6) + 1;
// }

// //get random number 1-6, add to roundscore if not 1
// Player.prototype.diceRoll = async function () {
//     const roll1 = getDiceRoll();
//     const roll2 = getDiceRoll();

//     rollObservers.forEach(function(observer) {
//         observer(roll1, roll2);
//     });

//     if (roll1 === 1 && roll2 === 1) {
//         this.roundScore = 0;
//         this.totalScore = 0;
//         updateDisplay(this, pTotal1, pRound1, pTotal2, pRound2);
//         await delay(1000);
//         changePlayer();
//     } else if (roll1 === 1 || roll2 === 1) {
//         this.roundScore = 0;
//         updateDisplay(this, pTotal1, pRound1, pTotal2, pRound2);
//         await delay(1000);
//         changePlayer();
//     } else {
//         this.roundScore += roll1 + roll2;
//         updateDisplay(this, pTotal1, pRound1, pTotal2, pRound2);
//     }
// }

