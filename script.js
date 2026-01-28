const board = document.getElementById('game-board');
const moveCount = document.getElementById('moves-count');
const timerDisplay = document.getElementById('timer-count');

const symbols = ['🔥', '🔥', '💻', '💻', '🚒', '🚒', '⚡', '⚡', '🚀', '🚀', '🧪', '🧪', '🛡️', '🛡️', '👾', '👾'];
let flippedCards = [];
let matchedCount = 0; // Renamed to match your checkMatch logic
let moves = 0;
let timer = 0;
let interval;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const shuffledSymbols = shuffle(symbols.slice());
    board.innerHTML = '';
    shuffledSymbols.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = symbol; // Use 'value' here
        card.innerHTML = symbol; 

        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    // Start timer on first click
    if (moves === 0 && flippedCards.length === 0 && !interval) {
        startTimer();
    }

    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            moveCount.innerText = moves; // Match your variable 'moveCount'
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    // Must match the 'dataset.value' from createBoard
    if (card1.dataset.value === card2.dataset.value) {
        matchedCount += 2;
        flippedCards = [];
        if (matchedCount === symbols.length) {
            clearInterval(interval);
            setTimeout(() => alert(`You won in ${moves} moves!`), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    interval = setInterval(() => {
        timer++;
        timerDisplay.innerText = timer;
    }, 1000);
}

// Start the game
createBoard();