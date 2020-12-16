//Shuffle cards
function shuffle(array) {
    for(let i = array.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

let cards = document.querySelectorAll(".memory-card");
let firstCard = null;
let secondCard = null;

//generate cards
let cardsName = ["bart", "maggie", "montgomery", "lisa", "homer", "marge"];
let numPairs = cards.length/2;
let randomCards = [];

for(var i = 0; i < numPairs; i++){
    let card = cardsName[i];
    randomCards.push(card);
    randomCards.push(card);
}

shuffle(randomCards);
console.log(randomCards);

for(var i = 0; i < randomCards.length; i++){
    document.getElementById("card_" + i).setAttribute("value", randomCards[i]);
}

//Store cards match cards
let active = true;
let score = 0;

function flipCard() {
    if(!active)
    {
        return;
    }
    let value = this.getAttribute('value');
    let src = "images/" + value + ".jpg";
    
    if (firstCard === null) { // this is the first card to be clicked
        firstCard = this;
        firstCard.src = src;
    } else {
        secondCard = this;
        secondCard.src = src;
        if (firstCard.getAttribute('value') === value) {
            firstCard.removeEventListener("click", flipCard);
            secondCard.removeEventListener("click", flipCard);
            score = score + 1;
            displayButton();
            firstCard = null;
            secondCard = null;
        } else { //not a match
            active = false;
            setTimeout(function() {
            firstCard.src = "images/back.jpg";
            secondCard.src = "images/back.jpg";
            firstCard = null;
            secondCard = null;
            active = true;
        }, 1000);
        }
    }
}


//Reset button
document.getElementById("reset").addEventListener('click',load);
function load() {
    window.location.reload();
}

//Win button and new game button
function displayButton() {
    if (score === 6){
        document.querySelector(".bg-modal").style.display = "flex";
        document.getElementById("submit").addEventListener('click',load);
        function load() {
            window.location.reload();
        }
    }
}

//Cards
function f(card) {
    card.addEventListener("click", flipCard);
}
cards.forEach(f);

//Close modal
document.querySelector(".close").addEventListener("click",function() {
    document.querySelector(".bg-modal").style.display = "none";
})





