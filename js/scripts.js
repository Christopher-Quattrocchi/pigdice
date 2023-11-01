// Business Logic

function diceRoll() {//Uses math functions to simulate rolling a die
    return Math.floor(Math.random() * 6) + 1;
}

function Player(name, score) {
    this.name = name;
    this.score = 0;
}

Player.prototype.addScore(roundScore) {
    this.score += roundScore;
}