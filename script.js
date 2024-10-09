'use strict';
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');
let totalScore0El = document.querySelector('#score--0');
let totalScore1El = document.querySelector('#score--1');
let currentScore0El = document.querySelector('#current--0');
let currentScore1El = document.querySelector('#current--1');

let diceEl = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnHold = document.querySelector('.btn--hold');
let btnRoll = document.querySelector('.btn--roll');

let scores, currentScore, activePlayer, playable;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playable = true;

  totalScore0El.textContent = 0;
  totalScore1El.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  diceEl.classList.add('hidden');
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  activePlayer = activePlayer === 1 ? 0 : 1;
};

btnRoll.addEventListener('click', function () {
  if (playable) {
    const dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playable) {
    scores[activePlayer] += currentScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playable = false;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  init();
});
