import { el, setChildren } from 'redom';
import getPayForm from './createPayForm';

const container = el('div', {
  className: 'container py-4 d-flex flex-column align-items-center',
});
const title = el('h1', 'Форма он-лайн оплаты');

setChildren(window.document.body, container);
setChildren(container, [
  title,
  getPayForm(),
]);
