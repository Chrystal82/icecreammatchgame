document.addEventListener('DOMContentLoaded', () => {
  const cardArray = [
    { name: 'Ice Cream Sign', img: 'images/icecreamsign.jpg' },
    { name: 'Ice Cream Bar', img: 'images/icecreambar.jpg' },
    { name: 'Ice Cream Sundae', img: 'images/icecreamsundaejar.jpg' },
    { name: 'Bowl of Ice Cream', img: 'images/bowloficecream.jpg' },
    { name: 'Ice Cream Cone', img: 'images/icecreamcone.jpg' },
    { name: 'Ice cream Truck', img: 'images/icecreamtruck.jpg' },
    { name: 'Ice Cream Sign', img: 'images/icecreamsign.jpg' },
    { name: 'Ice Cream Bar', img: 'images/icecreambar.jpg' },
    { name: 'Ice Cream Sundae', img: 'images/icecreamsundaejar.jpg' },
    { name: 'Bowl of Ice Cream', img: 'images/bowloficecream.jpg' },
    { name: 'Ice Cream Cone', img: 'images/icecreamcone.jpg' },
    { name: 'Ice cream Truck', img: 'images/icecreamtruck.jpg' }
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  const messageDisplay = document.querySelector('#message');
  const playAgainButton = document.querySelector('#play-again');
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  // Create your board
  function createBoard() {
    grid.innerHTML = '';
    messageDisplay.textContent = '';
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img');
      card.setAttribute('src', 'images/blank.png');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    }
    playAgainButton.style.display = 'none';
    cardsWon = [];
    resultDisplay.textContent = 'Score: 0';
  }

  // Check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/blank.png');
      cards[optionTwoId].setAttribute('src', 'images/blank.png');
      alert('You have clicked the same image!');
    } else if (cardsChosen[0] === cardsChosen[1]) {
      alert('You found a match');
      cards[optionOneId].setAttribute('src', 'images/white.png');
      cards[optionTwoId].setAttribute('src', 'images/white.png');
      cards[optionOneId].removeEventListener('click', flipCard);
      cards[optionTwoId].removeEventListener('click', flipCard);
      cardsWon.push(cardsChosen);
    } else {
      cards[optionOneId].setAttribute('src', 'images/blank.png');
      cards[optionTwoId].setAttribute('src', 'images/blank.png');
      alert('Sorry, try again');
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = 'Score: ' + cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
      messageDisplay.textContent = 'Congratulations! You found them all!';
      resultDisplay.textContent = 'Score: ' + cardsWon.length;
      launchConfetti();
      playAgainButton.style.display = 'block';
    }
  }

  // Flip your card
  function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }

 // Confetti function
 function launchConfetti() {
  var end = Date.now() + 5 * 1000;

  // use an interval to keep launching confetti
  var interval = setInterval(function() {
    if (Date.now() > end) {
      return clearInterval(interval);
    }

    confetti({
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
      colors: ['#ff6929', '#f7cdc6', '#ffffff']
    });
  }, 200);
}

  playAgainButton.addEventListener('click', createBoard);

  createBoard();
});
