export default function render(data) {
  const pageContainer = document.createElement('div');
  const cardsContainer = document.createElement('div');
  const pageTitle = document.createElement('h1');
  pageTitle.textContent = 'Список товаров';
  cardsContainer.classList.add(
    'd-flex',
    'justify-content-between',
    'flex-wrap',
    'py-4',
  );
  pageTitle.classList.add('text-center');
  pageContainer.append(pageTitle);
  pageContainer.append(cardsContainer);
  for (const product of data) {
    const productCard = document.createElement('div');
    const image = document.createElement('img');
    const cardBody = document.createElement('div');
    const title = document.createElement('h5');
    const price = document.createElement('div');
    const detailsBtn = document.createElement('a');

    productCard.style.width = '18rem';
    productCard.classList.add('card', 'mb-2');
    image.classList.add('card-img-top', 'mb-2');
    cardBody.classList.add('card-body');
    title.classList.add('card-title', 'mb-2');
    price.classList.add('card-text', 'display-5', 'mb-2');
    detailsBtn.classList.add('btn', 'btn-primary');

    productCard.append(image);
    productCard.append(cardBody);
    cardBody.append(title);
    cardBody.append(price);
    cardBody.append(detailsBtn);

    image.src = product.image;
    image.alt = product.name;
    title.textContent = product.name;
    price.textContent = product.price;
    detailsBtn.textContent = 'Подробнее';

    cardsContainer.append(productCard);
  }
  return pageContainer;
}
