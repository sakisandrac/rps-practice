// DOM Variables
let classicMode = document.querySelector('#classic');
let difficultMode = document.querySelector('#difficult');
let gameView = document.querySelector('.game-view');
let gameBoxes = document.querySelectorAll('.games');
let chooseMsg = document.querySelector('#chooseMsg');
let iconContainer = document.querySelector('.icon-container');
let loginView = document.querySelector('.login-view')
let playButton = document.querySelector('#play');
let userName = document.querySelector('#nameInput')
let playerName = document.querySelector('#playerName')
let winCountPlayer = document.querySelector('#playerWins');
let winCountComp = document.querySelector('#computerWins');
let resetIcons = iconContainer.innerHTML;

// Event Listeners
classicMode.addEventListener('click', login);
difficultMode.addEventListener('click',login);
playButton.addEventListener('click', playGame);
iconContainer.addEventListener('click', function(e){
    takeTurn(e);
    setTimeout(resetGame, 1000)
});

// Data Model
let game;
let gameChosen;
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
 
    iconContainer.innerHTML = `
        <img src="${player1.img}" class="icon" alt"${player1.icon} icon">
        <img src="${player2.img}" class="icon" alt"${player2.icon} icon">
     `

    playerWins.innerHTML = game.player1.wins
    computerWins.innerHTML = game.player2.wins
}

function chooseFighter(e){
    if (e.target.id === 'rockIcon'){
            return 0;
       }

    if (e.target.id === 'paperIcon'){
            return 1;
        }

   if (e.target.id === 'scissorsIcon'){
            return 2;
        }
}  

function computeFighter() {
    if (game.mode === 'classic'){
        return Math.floor(Math.random() * 3);
    }
}

function checkWinner(player, computer) {
    let winner;

    if (player === 'rock' && computer === 'paper'){
            winner = game.player2.name
            game.player2.wins += 1
    }
    if (player === 'rock' && computer === 'scissors'){
            winner = game.player1.name
            game.player1.wins += 1
    }
    if (player === 'paper' && computer === 'rock'){
            winner = game.player1.name
            game.player1.wins += 1
    }
    if (player === 'paper' && computer === 'scissors'){
            winner = game.player2.name
            game.player2.wins += 1
    }
    if (player === 'scissors' && computer === 'rock'){
            winner = game.player2.name
            game.player2.wins += 1
    }
    if (player === 'scissors' && computer === 'paper'){
            winner = game.player1.name
            game.player1.wins += 1
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

function resetGame() {
    iconContainer.innerHTML = resetIcons;
    chooseMsg.innerHTML = 'Choose Your Fighter'
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
