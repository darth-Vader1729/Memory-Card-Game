// // Get the audio element
// var audio = document.querySelector('audio');
// let count_flips = 0;
// let count_matches = 0;

// // Update the display
// const flipCountDisplay = document.getElementById('flipCount');
// const timerDisplay = document.getElementById('timer');

// const cards = document.querySelectorAll('.card');

// let hasFlippedCard = false;
// let lockBoard = false;
// let firstCard, secondCard;

// let timer; 
// let secondsElapsed = 0;

// function startTimer() {
//   timer = setInterval(() => {
//     secondsElapsed++;
//     const minutes = Math.floor(secondsElapsed/60);
//     const seconds = secondsElapsed % 60;
//     console.log(minutes, " ", seconds);
//     timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Update timer display
//   }, 1000);
// }

// function flipCard() {
//   if (lockBoard) return;
//   if (this === firstCard) return;

//   this.classList.add('flip');

//   // Increment the flip count
//   count_flips++;
//   flipCountDisplay.textContent = count_flips; // Update the display
  
//   // Start the timer on the first interaction
//   if (count_flips === 1) {
//     startTimer();
//   }
//   if (!hasFlippedCard) {
//     hasFlippedCard = true;
//     firstCard = this;
//     return;
//   }

//   secondCard = this;
//   lockBoard = true;

//   checkForMatch();
// }

// function checkForMatch() {
//   let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
//   if (isMatch) {
//     disableCards();
//     count_matches++;
//     checkGameOver();
//     console.log(firstCard.dataset, " ", secondCard.dataset);
//   } else {
//     unflipCards();
//   }
// }

// function disableCards() {
//   firstCard.removeEventListener('click', flipCard);
//   secondCard.removeEventListener('click', flipCard);

//   firstCard.classList.add('matched');
//   secondCard.classList.add('matched');
//   resetBoard();
// }

// function unflipCards() {
//   setTimeout(() => {
//     firstCard.classList.remove('flip');
//     secondCard.classList.remove('flip');

//     resetBoard();
//   }, 500);
// }

// function resetBoard() {
//   [hasFlippedCard, lockBoard] = [false, false];
//   [firstCard, secondCard] = [null, null];
// }

// (function shuffle() {
//   cards.forEach(card => {
//     let randomPos = Math.floor(Math.random() * 12);
//     card.style.order = randomPos;
//   });
// })();

// cards.forEach(card => card.addEventListener('click', flipCard));


// function checkGameOver() {
//   if(count_matches == 8) {
//     clearInterval(timer);
//     showGameOverMessage();
//   }
// }

// function showGameOverMessage() {
//   // Show the game over message
//   const gameOverMessage = document.getElementById('gameOverMessage');
//   const finalTime = document.getElementById('finalTime');
//   const finalFlipCount = document.getElementById('finalFlipCount');

//   // Calculate time in minutes and seconds
//   const minutes = Math.floor(secondsElapsed / 60);
//   const seconds = secondsElapsed % 60;
  
//   finalTime.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   finalFlipCount.textContent = count_flips;

//   // Display the message
//   gameOverMessage.style.display = 'block';
// }



// DOM elements
const flipCountDisplay = document.getElementById('flipCount');
const timerDisplay = document.getElementById('timer');
const gameOverMessage = document.getElementById('gameOverMessage');
const finalTime = document.getElementById('finalTime');
const finalFlipCount = document.getElementById('finalFlipCount');
const cards = document.querySelectorAll('.card');

// Game variables
let countFlips = 0, countMatches = 0, hasFlippedCard = false, lockBoard = false, firstCard, secondCard, timer, secondsElapsed = 0;

// Timer function
function startTimer() {
  timer = setInterval(() => {
    secondsElapsed++;
    const minutes = Math.floor(secondsElapsed / 60);
    const seconds = secondsElapsed % 60;
    timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, 1000);
}

// Flip card function
function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add('flip');
  countFlips++;
  flipCountDisplay.textContent = countFlips;

  if (countFlips === 1) startTimer();
  
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;
  checkForMatch();
}

// Check for match
function checkForMatch() {
  const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  if (isMatch) {
    disableCards();
    countMatches++;
    checkGameOver();
  } else {
    unflipCards();
  }
}

// Disable cards when matched
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');
  resetBoard();
}

// Unflip cards when not matched
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 500);
}

// Reset board state
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Shuffle cards
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

// Add event listeners to cards
cards.forEach(card => card.addEventListener('click', flipCard));

// Check for game over
function checkGameOver() {
  if (countMatches === 8) {
    clearInterval(timer);
    showGameOverMessage();
  }
}

// Show game over message
function showGameOverMessage() {
  const minutes = Math.floor(secondsElapsed / 60);
  const seconds = secondsElapsed % 60;
  finalTime.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  finalFlipCount.textContent = countFlips;
  gameOverMessage.style.display = 'block';
}
