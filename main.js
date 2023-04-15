// DOM Variables
let classicMode = document.querySelector('#classic');
let difficultMode = document.querySelector('#difficult');
let gameView = document.querySelector('.game-view');
let gameBoxes = document.querySelectorAll('.games');
let chooseMsg = document.querySelector('#chooseMsg');
let iconContainer = document.querySelector('.icon-container');
let resetIcons = iconContainer.innerHTML
let loginView = document.querySelector('.login-view')
let playButton = document.querySelector('#play');
let gameChosen;
let userName = document.querySelector('#nameInput')
let playerName = document.querySelector('#playerName')
// let fighters = {
//     0: 'rock'
//     1: 'paper',
//     2: 'scissors'
// }



// Event Listeners
classicMode.addEventListener('click', login);
difficultMode.addEventListener('click',login);
playButton.addEventListener('click', playGame);
iconContainer.addEventListener('click', function(e){takeTurn(e)});

// Data Model
let game;
let fighters = [
    {icon: 'rock', img: './assets/happy-rocks.png'},
    {icon: 'paper', img: './assets/happy-paper.png'},
    {icon: 'scissors', img: './assets/happy-paper.png'}
]

// Game Functions
function createPlayer(name, token = '👱') {
    return {
        name,
        token,
        wins: 0,
        fighter: [
            {icon: 'rock', img: './assets/happy-rocks.png'},
            {icon: 'paper', img: './assets/happy-paper.png'},
            {icon: 'scissors', img: './assets/happy-scissors.png'}
        ]
    }
}

function createGame(player1, player2, mode) {
    return {
        player1,
        player2,
        mode,
    }
}

function takeTurn(e){
    let playerChoice = game.player1.fighter[chooseFighter(e)];
    let computerChoice = game.player2.fighter[computeFighter()];
    
    // console.log(game.player1.fighter.find(item => item.icon === playerChoice.icon))
    console.log(playerChoice.icon, computerChoice.icon)
    displayResults(playerChoice, computerChoice)
}

function getResults(player1, player2) {
    if (checkDraw(player1.icon, player2.icon)){
        return 'Draw'
    } else {
        return checkWinner(player1.icon, player2.icon)
    }
}

function displayResults(player1, player2) {
    chooseMsg.innerHTML = getResults(player1, player2);
    console.log(player1.img, player2.img)
    iconContainer.innerHTML = `
        <img src="${player1.img}" class="icon" alt"${player1.icon} icon">
        <img src="${player2.img}" class="icon" alt"${player2.icon} icon">
    `
}

function chooseFighter(e){
    if (e.target.id === 'rockIcon'){
            return 0
       }

    if (e.target.id === 'paperIcon'){
            return 1
        }

   if (e.target.id === 'scissorsIcon'){
            return 2
        }
}  

function computeFighter() {
    if (game.mode === 'classic'){
    return Math.floor(Math.random() * 3)
    }
}

function checkWinner(player, computer) {
    let winner;

    if (player === 'rock' && computer === 'paper'){
            winner = game.player2.name
    }
    if (player === 'rock' && computer === 'scissors'){
            winner = game.player1.name
    }
    if (player === 'paper' && computer === 'rock'){
            winner = game.player1.name
    }
    if (player === 'paper' && computer === 'scissors'){
            winner = game.player2.name
    }
    if (player === 'scissors' && computer === 'rock'){
            winner = game.player2.name
    }
    if (player === 'scissors' && computer === 'paper'){
            winner = game.player1.name
    }
  
    return `${winner} wins!!`
}

function checkDraw(player, computer) {
    if (player === computer){
        return true;
    }
}

function playGame(e){
    e.preventDefault();
    displayName();
    checkGameChosen();
}

function checkGameChosen() {
    if (game.mode === 'classic'){
        classicModeView();
    } if (game.mode === 'difficult'){
        difficultModeView();
    }
}

let reset = document.querySelector('#temp')
reset.addEventListener('click', resetGame)

function resetGame() {
    iconContainer.innerHTML = resetIcons;
    chooseMsg.innerHTML = 'Choose Your Fighter'
    // displayName();
    // checkGameChosen();
}

// Login Page
function login(e){
    chooseMsg.innerHTML = 'Enter Your Name & Choose Avatar'

    loginView.classList.remove('hidden');
    for (let game of gameBoxes){
        game.classList.add('hidden')
    };

   createDataModel(e);
}

function createDataModel(e) {
    let player1 = createPlayer()
    let player2 = createPlayer('Computer', '💻')
    game = createGame(player1, player2, selectGameMode(e))
}

function selectGameMode(e) {
    if (e.target.id === 'classic' || e.target.parentElement.id === 'classic'){
        return 'classic';
    } 

    if (e.target.id === 'difficult' || e.target.parentElement.id === 'difficult'){
        return 'difficult';
    }
}

function displayName() {
    game.player1.name = userName.value;
    playerName.innerHTML = game.player1.name;
}

// Game Views 

function classicModeView() {
    chooseMsg.innerHTML = 'Choose Your Fighter'
    toggleHidden('add', [loginView])
    toggleHidden('remove', [gameView])
    // loginView.classList.add('hidden')
    // gameView.classList.remove('hidden')
    for (let game of gameBoxes){
            game.classList.add('hidden')
        }
}

function difficultModeView() {
    console.log('difficult!')
}

function toggleHidden(select, elements){
    for (let i=0; i < elements.length; i++){
    elements[i].classList[select]('hidden')
    }
}
