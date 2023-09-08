import { Card, AmazingCard } from './card.js';

let cardChoose = null;
const gameTimer = 20;

export default function createGamePage(dataArr) {
  const gameContainer = document.createElement('div');
  const cardsContainer = document.createElement('div');
  const timer = document.createElement('span');
  cardsContainer.classList.add(
    'd-flex',
    'justify-content-center',
    'flex-wrap',
    'py-4',
  );
  timer.classList.add('timer');
  gameContainer.append(cardsContainer);
  gameContainer.append(timer);
  timer.innerHTML = gameTimer;
  for (const cardNumber of dataArr) {
     // выбор между классом Card и AmazingCard
    new AmazingCard(cardsContainer, cardNumber, (card) => {
      if (cardChoose === null) {
        card.open = true;
        cardChoose = card;
      } else if (card.open === true) {
        card.open = false;
        cardChoose = null;
      } else {
        card.open = true;
        const tempCardChoose = cardChoose;
        if (cardChoose.cardNumber === card.cardNumber) {
          cardChoose.success = true;
          card.success = true;
        } else {
          setTimeout(() => {
            card.open = false;
            tempCardChoose.open = false;
          }, 500);
        }
        cardChoose = null;
      }
    });
  }
  return { gameContainer, timer, cardsContainer };
}
