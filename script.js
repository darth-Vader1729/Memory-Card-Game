window.addEventListener("DOMContentLoaded", event => {
    const audio = document.querySelector("audio");
    audio.volume = 0.2;
    audio.play();
  });
  

/*
const cards = document.querySelectorAll(".card");

let cardOne, cardTwo;

function flipCard(e)
{
    let clickedCard = e.target; // getting user clicked card

    if(clickedCard !== cardOne)
    {
        clickedCard.classList.add("flip");
        if(!cardOne)
        {
            // return the cardOne to clickedCard
            return cardOne = clickedCard;
        }
        // cardOne = clickedCard;
        cardTwo = clickedCard;
        
        let cardOneImg = cardOne.querySelector("img").src, 
        cardTwoImg = cardTwo.querySelector("img").src;

        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2)
{
    // 
    if(img1 === img2)
    {  // if the cards matched
        return console.log("cards matched");
    }
    
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");

}


cards.forEach(card => {   // adding click event to all cards
    card.addEventListener("click", flipCard)
});


// const cards = document.querySelectorAll(".card");

// console.log(cards);
*/




const cards = document.querySelectorAll('.card');

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
  }

  function unflipCards() {
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

 (function shuffle() {
   cards.forEach(card => {
     let ramdomPos = Math.floor(Math.random() * 12);
     card.style.order = ramdomPos;
   });
 })();

  cards.forEach(card => card.addEventListener('click', flipCard));
