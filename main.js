// DOM Variables
var classicMode = document.querySelector('#classic');
var difficultMode = document.querySelector('#difficult');
var gameView = document.querySelector('.game-view');
var gameBoxes = document.querySelectorAll('.games');
var chooseMsg = document.querySelector('#chooseMsg');
var iconContainer = document.querySelector('.icon-container');
var loginView = document.querySelector('.login-view');
var playButton = document.querySelector('#play');
var userName = document.querySelector('#nameInput');
var playerName = document.querySelector('#playerName');
var winCountPlayer = document.querySelector('#playerWins');
var winCountComp = document.querySelector('#computerWins');
var difficultIcons = document.querySelectorAll('.difficult-icon');
var changeGameBtn = document.querySelector('#changeGame');
var player1Token = document.querySelector('#player1Token');
var player2Token = document.querySelector('#player2Token');
var resetIcons = iconContainer.innerHTML;

// Event Listeners
classicMode.addEventListener('click', login);
difficultMode.addEventListener('click',login);
playButton.addEventListener('click', function(e){
    playGame(e, game.mode);
});
iconContainer.addEventListener('click', function(e){
    takeTurn(e, game);
    setTimeout(function() {
        resetGame(game.mode);
    }, 1000);
});
changeGameBtn.addEventListener('click', changeGames);

// Data Models
var game;

// Game Functions
function createPlayer(name, token = '👱') {
    return {
        name,
        token,
        wins: 0,
        fighterChosen: null
    }
}

function createGame(player1, player2, mode) {
    return {
        player1,
        player2,
        mode,
        winner: null,
        fighter: [
            {icon: 'rock', img: './assets/happy-rocks.png'},
            {icon: 'paper', img: './assets/happy-paper.png'},
            {icon: 'scissors', img: './assets/happy-scissors.png'},
            {icon: 'heart', img: './assets/happy-heart.png'},
            {icon: 'star', img: './assets/happy-star.png'}
        ],
        playerWins: {
            rock: ['scissors', 'heart'],
            paper: ['rock', 'star'],
            scissors: ['paper', 'heart'],
            heart: ['paper', 'star'],
            star: ['scissors', 'rock']
        }
    }
}

function playGame(e, mode){
    e.preventDefault();
    displayUserInfo();
    loadGame(mode);
    toggleHidden('remove', [changeGameBtn]);
}

function takeTurn(e, game){
    game.player1.fighterChosen = game.fighter[chooseFighter(e)];
    game.player2.fighterChosen = game.fighter[computeFighter(game.mode)];

    displayResults(game);
}

function chooseFighter(e){
    return parseInt(e.target.dataset.indexNumber);
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

function checkPlayerChoice(playerChoice) {
    var playerWin = Object.keys(game.playerWins);

    for (var i=0; i < playerWin.length; i++){
        if (playerWin[i] === playerChoice){
            return playerWin[i];
        }
    }
}

function checkWinner(game){
    let key = checkPlayerChoice(game.player1.fighterChosen.icon);

    for (var i=0; i < game.playerWins[key].length; i++){
        if (game.playerWins[key][i] === game.player2.fighterChosen.icon){
            game.player1.wins += 1;
            game.winner = game.player1.name;

            return `${game.winner} Wins!`;
        } else {
            game.player2.wins += 1;
            game.winner = game.player2.name;
 
            return `${game.winner} Wins!`;
        }
    }
}

function getResults(game) {
    if (checkDraw(game.player1.fighterChosen.icon, game.player2.fighterChosen.icon)){
        return 'Draw';
    } else {
        return checkWinner(game);
    }
}

function displayResults(game) {
    chooseMsg.innerHTML = getResults(game);
 
    iconContainer.innerHTML = 
        `<img src="${game.player1.fighterChosen.img}" class="icon" alt"${game.player1.fighterChosen.icon} icon">
        <img src="${game.player2.fighterChosen.img}" class="icon" alt"${game.player2.fighterChosen.icon} icon">`;

    winCountPlayer.innerHTML = `Wins: <p>${game.player1.wins}<p>`;
    winCountComp.innerHTML = `Wins: <p>${game.player2.wins}<p>`;
}

function resetGame(mode) {
    chooseMsg.innerHTML = 'Choose Your Fighter';
    loadIcons(mode);
}

function changeGames(){
    chooseMsg.innerHTML = 'Choose Your Game!';
    toggleHidden('remove', gameBoxes);
    toggleHidden('add', [gameView]);
}

function loadGame(mode) {
    chooseMsg.innerHTML = 'Choose Your Fighter';
    loadIcons(mode);
    toggleHidden('add', [loginView, ...gameBoxes]);
    toggleHidden('remove', [gameView]);
}

function loadIcons(mode) {
    if (mode === 'difficult'){
        iconContainer.innerHTML = `
        <img class="icon" data-index-number="0" src="./assets/happy-rocks.png" alt="paper icon">
        <img class="icon" data-index-number="1" src="./assets/happy-paper.png" alt="rock icon">
        <img class="icon" data-index-number="2" src="./assets/happy-scissors.png" alt="scissors icon">
        <img class="icon difficult-icon" data-index-number="3" src="./assets/happy-heart.png" alt="heart icon">
        <img class="icon difficult-icon" data-index-number="4" src="./assets/happy-star.png" alt="star icon">
        `;
    } else {
        iconContainer.innerHTML = resetIcons;
    }
}

function toggleHidden(select, elements){
    for (var i=0; i < elements.length; i++){
    elements[i].classList[select]('hidden');
    } 
}

// Login Page
function login(e){
    if (!game){
        chooseMsg.innerHTML = 'Enter Your Name';

        toggleHidden('remove', [loginView]);
        toggleHidden('add', gameBoxes);

        createDataModel(e);
    } else {
        game.mode = selectGameMode(e);
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

function displayUserInfo() {
    game.player1.name = userName.value;
    playerName.innerHTML = game.player1.name;
    player1Token.innerHTML = game.player1.token;
    player2Token.innerHTML = game.player2.token;
}

