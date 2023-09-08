export default function createResultPage(result) {
  const resultContainer = document.createElement('div');
  const resultText = document.createElement('h2');
  const restartBtn = document.createElement('button');
  resultText.classList.add('mb-4');
  resultText.innerText = result;
  restartBtn.innerHTML = 'Сыграть еще';
  restartBtn.classList.add('btn', 'btn-outline-info', 'btn-lg');
  resultContainer.append(resultText);
  resultContainer.append(restartBtn);
  return { resultContainer, restartBtn };
}
