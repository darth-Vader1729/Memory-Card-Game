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