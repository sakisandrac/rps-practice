// DOM Variables
var classicMode = document.querySelector('#classic');
var difficultMode = document.querySelector('#difficult');
var gameView = document.querySelector('.game-view');
var gameBoxes = document.querySelectorAll('.games');
var chooseMsg = document.querySelector('#chooseMsg');
var iconContainer = document.querySelector('.icon-container');
var loginView = document.querySelector('.login-view')
var playButton = document.querySelector('#play');
var userName = document.querySelector('#nameInput');
var playerName = document.querySelector('#playerName');
var winCountPlayer = document.querySelector('#playerWins');
var winCountComp = document.querySelector('#computerWins');
var difficultIcons = document.querySelectorAll('.difficult-icon');
var changeGameBtn = document.querySelector('#changeGame');
var resetIcons = iconContainer.innerHTML;

// Event Listeners
classicMode.addEventListener('click', login);
difficultMode.addEventListener('click',login);
playButton.addEventListener('click', playGame);
iconContainer.addEventListener('click', function(e){
    takeTurn(e);
    setTimeout(function() {
        resetGame(game.mode)
    }, 1000);
});
changeGameBtn.addEventListener('click', changeGames)

// Data Models
var game;
var changedGames = false;

// Game Functions
function createPlayer(name, token = '👱') {
    return {
        name,
        token,
        wins: 0,
        fighter: [
            {icon: 'rock', img: './assets/happy-rocks.png'},
            {icon: 'paper', img: './assets/happy-paper.png'},
            {icon: 'scissors', img: './assets/happy-scissors.png'},
            {icon: 'heart', img: './assets/happy-heart.png'},
            {icon: 'heart', img: './assets/happy-star.png'}
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

function playGame(e, mode){
    e.preventDefault();
    displayUserInfo();
    loadGame(mode);
    toggleHidden('remove', [changeGameBtn]);
}

function takeTurn(e){
    var playerChoice = game.player1.fighter[chooseFighter(e)];
    var computerChoice = game.player2.fighter[computeFighter(game.mode)];

    displayResults(playerChoice, computerChoice);
}

function chooseFighter(e){
    return parseInt(e.target.id)
}  

function computeFighter(mode) {
    if (mode === 'classic'){
        return Math.floor(Math.random() * 3);
    }

    if (mode === 'difficult'){
        return Math.floor(Math.random() * 5);
    }
}

function checkDraw(player, computer) {
    if (player === computer){
        return true;
    }
}

function checkWinner(player, computer) {
    var winner;

    if (player === 'rock' && computer === 'scissors'){
            winner = game.player1;
        }

    else if (player === 'rock' && computer === 'heart'){
            winner = game.player1;
        }
    
    else if (player === 'paper' && computer === 'rock'){
            winner = game.player1;
        }

    else if (player === 'paper' && computer === 'star'){
            winner = game.player1;
        }

    else if (player === 'scissors' && computer === 'paper'){
            winner = game.player1;
        }

    else if (player === 'scissors' && computer === 'heart'){
            winner = game.player1;
        }

    else if (player === 'heart' && computer === 'paper'){
            winner = game.player1;
        }
  
    else if (player === 'heart' && computer === 'star'){
            winner = game.player1;
        }   

    else if (player === 'star' && computer === 'scissors'){
            winner = game.player1;
        }

    else if (player === 'star' && computer === 'rock'){
            winner = game.player1;
        } 
        
    else {
        winner = game.player2;
    }

    winner.wins +=1
    return `${winner.name} wins!!`;
}

function getResults(player1, player2) {
    if (checkDraw(player1.icon, player2.icon)){
        return 'Draw';
    } else {
        return checkWinner(player1.icon, player2.icon);
    }
}

function displayResults(player1, player2) {
    chooseMsg.innerHTML = getResults(player1, player2);
 
    iconContainer.innerHTML = `
        <img src="${player1.img}" class="icon" alt"${player1.icon} icon">
        <img src="${player2.img}" class="icon" alt"${player2.icon} icon">
     `

    playerWins.innerHTML = `Wins: <p>${game.player1.wins}<p>`
    computerWins.innerHTML = `Wins: <p>${game.player2.wins}<p>`
}

function resetGame(mode) {
    chooseMsg.innerHTML = 'Choose Your Fighter';
    loadIcons(mode);
}

function changeGames(){
    changedGames = true;
    toggleHidden('remove', gameBoxes);
    toggleHidden('add', [gameView]);
}

// Login Page
function login(e){
    if (!changedGames){
        chooseMsg.innerHTML = 'Enter Your Name & Choose Avatar';

        toggleHidden('remove', [loginView]);
        toggleHidden('add', gameBoxes);

        createDataModel(e);
    } else {
        game.mode = selectGameMode(e)
        playGame(e, game.mode);
    }
}

function createDataModel(e) {
    var player1 = createPlayer();
    var player2 = createPlayer('Computer', '💻');
    game = createGame(player1, player2, selectGameMode(e));
}

function selectGameMode(e) {
    if (e.target.id === 'classic' || e.target.parentElement.id === 'classic'){
        return 'classic';
    } 

    if (e.target.id === 'difficult' || e.target.parentElement.id === 'difficult'){
        return 'difficult';
    }
}
var player1Token = document.querySelector('#player1Token');
var player2Token = document.querySelector('#player2Token');

function displayUserInfo() {
    game.player1.name = userName.value;
    playerName.innerHTML = game.player1.name;
    player1Token.innerHTML = game.player1.token
    player2Token.innerHTML = game.player2.token
}

function toggleHidden(select, elements){
    for (var i=0; i < elements.length; i++){
    elements[i].classList[select]('hidden');
    }
}

// Game Views 
// function classicModeView() {
//     chooseMsg.innerHTML = 'Choose Your Fighter';
//     classicIconsLoad();
//     toggleHidden('add', [loginView, ...gameBoxes]);
//     toggleHidden('remove', [gameView]);
// }

// function difficultModeView() {
//     chooseMsg.innerHTML = 'Choose Your Fighter';
//     toggleHidden('add', [loginView, ...gameBoxes]);
//     toggleHidden('remove', [gameView]);
//     difficultIconsLoad()

// }

function loadGame(mode) {
    chooseMsg.innerHTML = 'Choose Your Fighter';
    loadIcons(mode);
    toggleHidden('add', [loginView, ...gameBoxes]);
    toggleHidden('remove', [gameView]);
}

function loadIcons(mode) {
    if (mode === 'difficult'){
        iconContainer.innerHTML = `
        <img class="icon" id="0" src="./assets/happy-rocks.png" alt="paper icon">
        <img class="icon" id="1" src="./assets/happy-paper.png" alt="rock icon">
        <img class="icon" id="2" src="./assets/happy-scissors.png" alt="scissors icon">
        <img class="icon difficult-icon" id="3" src="./assets/happy-heart.png" alt="heart icon">
        <img class="icon difficult-icon" id="4" src="./assets/happy-star.png" alt="star icon">
        `
    } else {
        iconContainer.innerHTML = resetIcons;
    }
}

// function classicIconsLoad() {
//     iconContainer.innerHTML = resetIcons;
// }