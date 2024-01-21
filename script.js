javascript
let cards = [];
let flippedCards = [];
let tries = 0;
let timer;
let gameStarted = false;
let matches = 0;

function createCard(character) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = character;
    card.addEventListener('click', () => flipCard(card));
    return card;
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function initializeGame() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    cards = shuffle([...characters, ...characters]);
    const gameContainer = document.querySelector('.game-container');
    
    cards.forEach((character) => {
        const card = createCard(character);
        gameContainer.appendChild(card);
    });

    setTimeout(() => {
        gameContainer.childNodes.forEach((card) => card.textContent = '');
    }, 2000);

    startTimer();
    gameStarted = true;
}

function flipCard(card) {
    if (!gameStarted) return;

    if (flippedCards.length < 2 && !flippedCards.includes(card)) {
        card.textContent = card.textContent === '' ? cards[flippedCards.length] : '';
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            tries++;
            updateTries();
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.textContent === card2.textContent) {
        matches++;
        if (matches === cards.length / 2) {
            endGame(true);
        }
    } else {
        card1.textContent = '';
        card2.textContent = '';
    }

    flippedCards = [];
}

function updateTries() {
    document.getElementById('tries').textContent = `Tries: ${tries}`;
}

function startTimer() {
    let seconds = 0;
    timer = setInterval(() => {
        seconds++;
        document.getElementById('timer').textContent = `Timer: ${seconds}s`;

        if (seconds === 20) {
            endGame(false);
        }
    }, 1000);
}

function endGame(isWinner) {
    clearInterval(timer);
    gameStarted = false;
    
    if (isWinner) {
        alert(`Congratulations! You won in ${tries} tries.`);
    } else {
        alert('Time is up! Game over.');
    }
    
    resetGame();
}

function resetGame() {
    document.querySelector('.game-container').innerHTML = '';
    document.getElementById('tries').textContent = 'Tries: 0';
    document.getElementById('timer').textContent = 'Timer: 0s';
    tries = 0;
    matches = 0;
    initializeGame();
}

initializeGame();

