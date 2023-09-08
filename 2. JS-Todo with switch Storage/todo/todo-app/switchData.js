export default function createSwitchDataBtn() {
  const container = document.getElementById('todo-app');
  const buttonWrapper = document.createElement('div');
  const switchDataBtn = document.createElement('button');
  switchDataBtn.classList.add('btn', 'btn-outline-info');
  buttonWrapper.classList.add('d-flex', 'justify-content-center', 'mb-3');
  buttonWrapper.append(switchDataBtn);
  container.append(buttonWrapper);
  switchDataBtn.addEventListener('click', () => {
    if (switchDataBtn.textContent === 'Download From Server') {
      switchDataBtn.textContent = 'Download From LocalStorage';
      const mode = 'api';
      localStorage.setItem('storageMode', mode);
      location.reload();
    } else if (switchDataBtn.textContent === 'Download From LocalStorage') {
      switchDataBtn.textContent = 'Download From Server';
      const mode = 'local';
      localStorage.setItem('storageMode', mode);
      location.reload();
    }
  });
  const mode = localStorage.getItem('storageMode');
  if (mode === 'api') {
    switchDataBtn.textContent = 'Download From LocalStorage';
  } else {
    switchDataBtn.textContent = 'Download From Server';
  }
  return { switchDataBtn };
}
