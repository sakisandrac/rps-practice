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
playButton.addEventListener('click', playGame);
iconContainer.addEventListener('click', chooseFighter);

// Data Model
// Psuedocode:
    // click lets play button and create a player with the name passed in, and create a game with two players passed in, and the game.level: classic.difficult. player and computer's wins will uddate
    //user chooses an icon, invoke takeTurn function   
        //take turn function checks the icon selection and generates computer's random selection
        //check draw first to see if player and computer choice was same
        //check winner if draw is false, wins will be pushed into either player.wins or computer.wins
    //player and computer wins display will update based on the number of wins in the player's data models.
    let game;

// Functions
function createPlayer(name = 'Player') {
    return {
        name,
        token: '👱',
        wins: 0
    }
}

function createGame(player1, player2, mode) {
    return {
        player1,
        player2,
        mode,
    }
}

// function playGame(modeChosen) {
//     let player1 = createPlayer(userName.value)
//     let player2 = createPlayer('Computer')
    
//     createGame(player1, player2, mode)
// }

function takeTurn(){

}

function checkWinner(){

}

function checkDraw() {

}

function resetGame() {

}

// Login Page
function login(e){
    chooseMsg.innerHTML = 'Enter Your Name & Choose Avatar'

    loginView.classList.remove('hidden');
    for (let game of gameBoxes){
        game.classList.add('hidden')
    };
    game = createGame()
    selectGameMode(e);
}

function selectGameMode(e) {
    if (e.target.id === 'classic' || e.target.parentElement.id === 'classic'){
        game.mode = 'classic';
    } 

    if (e.target.id === 'difficult' || e.target.parentElement.id === 'difficult'){
        game.mode = 'difficult';
    }
}

function checkGameChosen() {
    if (game.mode === 'classic'){
        classicModeGame();
    } if (game.mode === 'difficult'){
        difficultModeGame();
    }
}

function checkName() {
    if (userName.value){
        playerName.innerHTML = userName.value
    }
}

function playGame(e){
    e.preventDefault();
    checkGameChosen();
    checkName();
}

// Classic Mode 
function classicModeGame() {
    game.mode = 'classic';
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
