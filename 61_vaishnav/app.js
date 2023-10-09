const scoreLabel = document.querySelector('.cs61-value');
let paper = document.getElementById('cs61-paper');
let scissors = document.getElementById('cs61-scissors');
let rock = document.getElementById('cs61-rock');
const gameOptions = document.querySelector('.cs61-game-options');
const resultContainer = document.querySelector('.cs61-result-container');
const resetBtn = document.querySelector('.cs61-play-again');
const userImg = document.getElementById('cs61-user');
const compImg = document.getElementById('cs61-machine');
const buttons = document.querySelectorAll('.cs61-button');
const player = document.getElementById('cs61-player');
const computer = document.getElementById('cs61-computer');
const resultBox = document.querySelector('.cs61-result-title');
const hideComputerChoice = document.querySelector('.cs61-invisible');
let gameResult = document.getElementById('cs61-status');
let userChoice, computerChoice;
let score = 0;
let winner;
const pointMap = new Map();
pointMap.set('paper', 0);
pointMap.set('scissors', 1);
pointMap.set('rock', 2);

function init() {
    let choices = ['paper', 'scissors', 'rock'];
    userChoice = undefined;
    computerChoice = undefined;

    buttons.forEach((curr) => {
        curr.addEventListener('click', () => {
            userChoice = curr.id;
            userChoice = userChoice.replace(/cs61-/g, '');
            choices.splice(choices.indexOf(userChoice), 1);
            computerChoice = choices[choiceGen()];
            console.log(userChoice);
            console.log(computerChoice);
            console.log(choices);
            choices = ['paper', 'scissors', 'rock'];
            checkWinner();
            result(userChoice, computerChoice);
        });
    });
}

//choice generator for computer

function choiceGen() {
    return Math.floor(Math.random() * 2);
}
//Update Score

function updateScore(value) {
    score += value;
    scoreLabel.innerHTML = score;
}
//function to check who is the winner

function checkWinner() {
    if (userChoice === 'paper' && computerChoice === 'rock') {
        gameResult.innerText = 'you win';
        winner = userChoice;

        setTimeout(() => {
            updateScore(1);
        }, 3450);
    } else if (userChoice === 'rock' && computerChoice === 'paper') {
        gameResult.innerText = 'you lose';
        winner = computerChoice;
        setTimeout(() => {
            updateScore(-1);
        }, 3450);
    } else if (pointMap.get(userChoice) > pointMap.get(computerChoice)) {
        gameResult.innerText = 'you win';
        winner = userChoice;
        setTimeout(() => {
            updateScore(1);
        }, 3450);
    } else {
        gameResult.innerText = 'you lose';
        winner = computerChoice;
        setTimeout(() => {
            updateScore(-1);
        }, 3450);
    }
    console.log(score);
}

//update the view

function result(userChoice, computerChoice) {
    gameOptions.classList.add('active');
    resultContainer.classList.add('active');
    player.classList.add(userChoice);
    computer.classList.add(computerChoice);

    userImg.src = `images/icon-${userChoice}.svg`;
    compImg.src = `images/icon-${computerChoice}.svg`;

    setTimeout(load, 3500);
    setTimeout(showComputerChoice, 2000);
}

function load() {
    resultContainer.classList.add('load');
    resultBox.classList.add('active');
    if (winner == userChoice) {
        player.classList.add('cs61-effect-left');
    } else {
        computer.classList.add('cs61-effect-right');
    }
}

function showComputerChoice() {
    hideComputerChoice.classList.add('active');
}

function reset() {
    gameOptions.classList.remove('active');
    resultContainer.classList.remove('active');
    player.classList.remove(userChoice);
    computer.classList.remove(computerChoice);
    player.classList.remove('cs61-effect-left');
    computer.classList.remove('cs61-effect-right');
    resultContainer.classList.remove('load');
    resultBox.classList.remove('active');
    hideComputerChoice.classList.remove('active');
}

//setting play again init();
resetBtn.addEventListener('click', reset);

init();
