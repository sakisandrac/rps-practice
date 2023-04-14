// DOM Variables
let classicMode = document.querySelector('#classic');
let difficultMode = document.querySelector('#difficult');
let gameView = document.querySelector('.game-view');
let gameBoxes = document.querySelectorAll('.games');
let chooseMsg = document.querySelector('#chooseMsg');
let iconContainer = document.querySelector('.icon-container');
let icons = {
    paper: document.querySelector('#paperIcon'),
    rock: document.querySelector('#rockIcon'),
    scissors: document.querySelector('#scissorsIcon')
}

// Event Listeners
classicMode.addEventListener('click', classicModeGame);
difficultMode.addEventListener('click', difficultModeGame);
iconContainer.addEventListener('click', chooseFighter)

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
function classicModeGame() {
    chooseMsg.innerHTML = 'Pick Your Fighter!'
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