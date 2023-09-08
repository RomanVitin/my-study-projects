import render from './products-page.js';
import getErrorList from './error-block.js';
import getLoadingSpinner from './loading-spinner.js';
import getEmptyTitle from './empty-title.js';

const SERVER_URL = 'http://localhost:3000';
let errorData = [];
const appContainer = document.getElementById('app');
const spinner = getLoadingSpinner();
appContainer.append(spinner);

async function getProducts() {
  const response = await fetch(`${SERVER_URL}/api/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 200) {
    if (localStorage.getItem('counter500')) {
      localStorage.setItem('counter500', 0);
    }
    try {
      const productsData = await response.json();
      return productsData;
    } catch (error) {
      switch (error.name) {
        case 'SyntaxError': {
          const err = {
            name: 'SERVER',
            message: 'Произошла ошибка, попробуйте обновить страницу позже',
          };
          errorData.push(err);
          throw err;
        }
        default: throw error;
      }
    }
  } else if (response.status === 404) {
    if (localStorage.getItem('counter500')) {
      localStorage.setItem('counter500', 0);
    }
    let err = new Error();
    err = {
      name: 'SERVER',
      message: 'Список товаров пуст',
    };
    errorData.push(err);
    const emptyTitle = getEmptyTitle('Список товаров пуст');
    appContainer.append(emptyTitle);
    throw err;
  } else if (response.status === 500) {
    let countErr500 = localStorage.getItem('counter500') || 0;
    countErr500 = ++countErr500;
    localStorage.setItem('counter500', countErr500);
    if (countErr500 < 4) {
      let err = new Error();
      err = {
        name: 'SERVER',
        message: 'Произошла ошибка, обновите страницу',
      };
      errorData.push(err);
      throw err;
    } else {
      let err = new Error();
      err = {
        name: 'SERVER',
        message: 'Произошла ошибка, попробуйте обновить страницу позже',
      };
      errorData.push(err);
      throw err;
    }
  } else {
    let err = new Error();
    err = {
      name: 'SERVER',
      message: 'Неизвестная ошибка',
    };
    errorData.push(err);
    throw err;
  }
}

getProducts()
  .then((data) => {
    spinner.style.display = 'none';
    const renderPage = render(data.products);
    appContainer.append(renderPage);
  })
  .catch((err) => {
    if (err.name !== 'SERVER') {
      errorData.push(err);
    }
    spinner.style.display = 'none';
    const errList = getErrorList(errorData);
    appContainer.append(errList);
    setTimeout(() => {
      errList.style.opacity = '0';
    }, 3000);
  });

window.addEventListener('online', () => {
  const liveInfo = { name: 'info', message: 'Подключение к интернету восстановлено!' };
  errorData = [];
  errorData.push(liveInfo);
  const infoList = getErrorList(errorData);
  appContainer.append(infoList);
  setTimeout(() => {
    infoList.style.opacity = '0';
  }, 3000);
});

window.addEventListener('offline', () => {
  const liveInfo = { name: 'info', message: 'Произошла ошибка, проверьте подключение к интернету' };
  errorData = [];
  errorData.push(liveInfo);
  const infoList = getErrorList(errorData);
  appContainer.append(infoList);
  setTimeout(() => {
    infoList.style.opacity = '0';
  }, 3000);
});
