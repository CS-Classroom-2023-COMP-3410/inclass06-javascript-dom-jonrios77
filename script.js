const board = document.getElementById('game-board'); //build board
const moveCount = document.getElementById('moves-count'); //move counter
const timerDisplay = document.getElementById('timer-count'); //timer display

const symbols = ['🔥', '🔥', '💻', '💻', '🚒', '🚒', '⚡', '⚡', '🚀', '🚀', '🧪', '🧪', '🛡️', '🛡️', '👾', '👾']; //symbols to find
let flippedCards = [];
let matchedCards = 0;
let moves = 0;
let timer;
let seconds = 0;
let minutes = 0;
let interval;
let gameStarted = false;

//shuffle cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//create board
function createBoard() {
    const shuffledSymbols = shuffle(symbols.slice());
    board.innerHTML = '';
    shuffledSymbols.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol; //hidden symbol
        card.innerHTML = symbol; //the text

        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}
