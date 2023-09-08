import createAppTitle from './createAppTitle.js';
import createStartPage from './createStartPage.js';
import createGamePage from './createGamePage.js';
import getDataArr from './getDataArr.js';
import createResultPage from './createResultPage.js';

const container = document.getElementById('app');
let amount = null;

const appTitle = createAppTitle('"Игра в Пары!"');
const startPage = createStartPage();

container.append(appTitle);
container.append(startPage.form);

startPage.form.addEventListener('submit', (e) => {
  e.preventDefault();
  amount = parseInt(startPage.input.value, 10);
  const newArr = getDataArr(amount);
  const gamePage = createGamePage(newArr);
  startPage.form.remove();
  container.append(gamePage.gameContainer);
  const interval = setInterval(() => {
    if (gamePage.timer.innerHTML > 0) gamePage.timer.innerHTML--;
    else if (gamePage.timer.innerHTML === '0') {
      clearInterval(interval);
      gamePage.timer.innerHTML = 'Время вышло';
      const resultPage = createResultPage('Время вышло');
      const finalInterval = setInterval(() => {
        gamePage.gameContainer.remove();
        container.append(resultPage.resultContainer);
        clearInterval(finalInterval);
      }, 1000);
      resultPage.restartBtn.addEventListener('click', () => {
        location.reload();
      });
    }
    if (document.querySelectorAll('.success').length === newArr.length) {
      clearInterval(interval);
      gamePage.timer.innerHTML = 'ПОБЕДА!';
      const resultPage = createResultPage('Победа!');
      const finalInterval = setInterval(() => {
        gamePage.gameContainer.remove();
        container.append(resultPage.resultContainer);
        clearInterval(finalInterval);
      }, 3000);
      resultPage.restartBtn.addEventListener('click', () => {
        location.reload();
      });
    }
  }, 1000);
});
