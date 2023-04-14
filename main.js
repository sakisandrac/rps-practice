// DOM Variables
let classicMode = document.querySelector('#classic');
let difficultMode = document.querySelector('#difficult');
let gameView = document.querySelector('.game-view');
let gameBoxes = document.querySelectorAll('.games');
let chooseMsg = document.querySelector('#chooseMsg');
let iconContainer = document.querySelector('.icon-container');
let loginView = document.querySelector('.login-view')
let playButton = document.querySelector('#play');
let icons = {
    paper: document.querySelector('#paperIcon'),
    rock: document.querySelector('#rockIcon'),
    scissors: document.querySelector('#scissorsIcon')
}
let gameChosen;
let userName = document.querySelector('#nameInput')
let playerName = document.querySelector('#playerName')


// Event Listeners
classicMode.addEventListener('click', login);
difficultMode.addEventListener('click',login);
iconContainer.addEventListener('click', chooseFighter);
playButton.addEventListener('click', playGame)

// Data Model
// let game = {
//     player: {
//         name: 'Human',
//         token,
//         wins: 0
//     },
//     isActive: false,
//     computerWins: 0,
//     playerWon: false,
// }

// Functions
function createPlayer(token) {
    return {
        name: 'Human',
        token,
        wins: 0
    }
}

function createGame(game, player1, player2) {
    return {
        game,
        player1,
        player2,
    }
}
// Classic Mode 
function login(e){
    loginView.classList.remove('hidden');
    chooseMsg.innerHTML = 'Enter Your Name & Choose Avatar'

    for (let game of gameBoxes){
        game.classList.add('hidden')
    };

    if (e.target.id === 'classic' || e.target.parentElement.id === 'classic'){
        gameChosen = 'classic';
    } 

    if (e.target.id === 'difficult' || e.target.parentElement.id === 'difficult'){
        gameChosen = 'difficult';
    }
    console.log(gameChosen)
}

function playGame(e){
    e.preventDefault();

    if (gameChosen === 'classic'){
        classicModeGame();
    } if (gameChosen === 'difficult'){
        difficultModeGame();
    }

    checkName()
}

function checkName() {
    if (userName.value){
        playerName.innerHTML = userName.value
    }
}

function classicModeGame() {
    gameChosen = 'classic';
    chooseMsg.innerHTML = 'Choose Your Fighter'

    loginView.classList.add('hidden')
    gameView.classList.remove('hidden')
    for (let game of gameBoxes){
            game.classList.add('hidden')
        }
}

function chooseFighter(e) {
   if (e.target.id === 'paperIcon'){
    console.log('paper')
   }

   if (e.target.id === 'rockIcon'){
    console.log('rock')
   }

   if (e.target.id === 'scissorsIcon'){
    console.log('scissors')
   }

}

// Difficult Mode 
function difficultModeGame() {
    console.log('difficult!')
}
