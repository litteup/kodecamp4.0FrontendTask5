'use strict';

//Selecting the elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // re-setting the score and current values to 0
  score0Element.textContent = 0;
  score1Element.textContent = 0;

  current0Element.textContent = 0;
  current1Element.textContent = 0;

  // Adding dice
  diceElement.classList.add('hidden');

  //removing the winner background
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');

  //remove active player
  player0Element.classList.add('player--active'); // starts the game so should be active
  player1Element.classList.remove('player--active');
};

init();

// Function that switches players turn
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// setting the initial players score to zero
score0Element.textContent = 0;
score1Element.textContent = 0;

// Hide the dice image
diceElement.classList.add('hidden');

// Roll the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generate random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `./image/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch active player
      switchPlayer();
    }
  }
});

//Implementing the hold event
btnHold.addEventListener('click', function () {
  if (playing) {
    //Add score to active player score
    scores[activePlayer] += currentScore;

    //display the score on hold
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if active player score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else switchPlayer(); //swtich players
  }
});

//Activation New game button
btnNew.addEventListener('click', init);
