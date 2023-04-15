// DOM Variables
let classicMode = document.querySelector('#classic');
let difficultMode = document.querySelector('#difficult');
// let chooseGameView = document.querySelector('.choose-view');
let gameView = document.querySelector('.game-view');
let gameBoxes = document.querySelectorAll('.games');
let chooseMsg = document.querySelector('#chooseMsg');
let iconContainer = document.querySelector('.icon-container');
let loginView = document.querySelector('.login-view')
let playButton = document.querySelector('#play');
let userName = document.querySelector('#nameInput');
let playerName = document.querySelector('#playerName');
let winCountPlayer = document.querySelector('#playerWins');
let winCountComp = document.querySelector('#computerWins');
let difficultIcons = document.querySelectorAll('.difficult-icon');
let changeGameBtn = document.querySelector('#changeGame');
let resetIcons = iconContainer.innerHTML;

// Event Listeners
classicMode.addEventListener('click', login);
difficultMode.addEventListener('click',login);
playButton.addEventListener('click', playGame);
iconContainer.addEventListener('click', function(e){
    takeTurn(e);
    setTimeout(resetGame, 1000);
});
changeGameBtn.addEventListener('click', changeGames)

// Data Models
let game;
let changedGames = false;

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

function takeTurn(e){
    let playerChoice = game.player1.fighter[chooseFighter(e)];
    let computerChoice = game.player2.fighter[computeFighter()];
    console.log(playerChoice, computerChoice)
    displayResults(playerChoice, computerChoice);
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

function chooseFighter(e){
    return parseInt(e.target.id)
}  

function computeFighter() {
    if (game.mode === 'classic'){
        return Math.floor(Math.random() * 3);
    }

    if (game.mode === 'difficult'){
        return Math.floor(Math.random() * 5);
    }
}

function checkWinner(player, computer) {
    let winner;

    if (player === 'rock' && computer === 'scissors'){
            winner = game.player1.name;
            game.player1.wins += 1;
        }

    else if (player === 'rock' && computer === 'heart'){
        winner = game.player1.name;
        game.player1.wins += 1;
        }
    
    else if (player === 'paper' && computer === 'rock'){
            winner = game.player1.name;
            game.player1.wins += 1;
        }

    else if (player === 'paper' && computer === 'star'){
            winner = game.player1.name;
            game.player1.wins += 1;
        }

    else if (player === 'scissors' && computer === 'paper'){
            winner = game.player1.name;
            game.player1.wins += 1;
        }

    else if (player === 'scissors' && computer === 'heart'){
            winner = game.player1.name;
            game.player1.wins += 1;
        }

    else if (player === 'heart' && computer === 'paper'){
            winner = game.player1.name;
            game.player1.wins += 1;
        }
  
    else if (player === 'heart' && computer === 'star'){
            winner = game.player1.name;
            game.player1.wins += 1;
        }   

    else if (player === 'star' && computer === 'scissors'){
            winner = game.player1.name;
            game.player1.wins += 1;
        }

    else if (player === 'star' && computer === 'rock'){
            winner = game.player1.name;
            game.player1.wins += 1;
        } 
        
    else {
        winner = game.player2.name;
        game.player2.wins += 1;
    }

    return `${winner} wins!!`;
}

function checkDraw(player, computer) {
    if (player === computer){
        return true;
    }
}

function playGame(e){
        e.preventDefault();
        displayName();
        checkGameChosen(game.mode);
        toggleHidden('remove', [changeGameBtn])
}

function checkGameChosen(mode) {
    if (mode === 'classic'){
        classicModeView();
    } if (mode === 'difficult'){
        difficultModeView();
    }
}

function resetGame() {
    chooseMsg.innerHTML = 'Choose Your Fighter';
    iconContainer.innerHTML = resetIcons;
    if (game.mode === 'difficult'){
       loadDifficultIcons();
    }
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
        playGame(e);

    }
}

function createDataModel(e) {
    let player1 = createPlayer();
    let player2 = createPlayer('Computer', '💻');
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

function displayName() {
    game.player1.name = userName.value;
    playerName.innerHTML = game.player1.name;
}

function toggleHidden(select, elements){
    for (let i=0; i < elements.length; i++){
    elements[i].classList[select]('hidden');
    }
}

// Game Views 
function classicModeView() {
    chooseMsg.innerHTML = 'Choose Your Fighter';
    loadClassicIcons();
    toggleHidden('add', [loginView, ...gameBoxes]);
    toggleHidden('remove', [gameView]);
}

function difficultModeView() {
    chooseMsg.innerHTML = 'Choose Your Fighter';
    toggleHidden('add', [loginView, ...gameBoxes]);
    toggleHidden('remove', [gameView, ...difficultIcons]);
    loadDifficultIcons()

}

function loadDifficultIcons() {
    iconContainer.innerHTML = `
        <img class="icon" id="0" src="./assets/happy-paper.png" alt="paper icon">
        <img class="icon" id="1" src="./assets/happy-rocks.png" alt="rock icon">
        <img class="icon" id="2" src="./assets/happy-scissors.png" alt="scissors icon">
        <img class="icon difficult-icon" id="3" src="./assets/happy-heart.png" alt="heart icon">
        <img class="icon difficult-icon" id="4" src="./assets/happy-star.png" alt="star icon">
        `
}

function loadClassicIcons() {
    iconContainer.innerHTML = `
        <img class="icon" id="0" src="./assets/happy-paper.png" alt="paper icon">
        <img class="icon" id="1" src="./assets/happy-rocks.png" alt="rock icon">
        <img class="icon" id="2" src="./assets/happy-scissors.png" alt="scissors icon">`
}