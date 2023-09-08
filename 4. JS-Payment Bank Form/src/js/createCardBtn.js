import { el, setChildren } from 'redom';

export default function createCardBtn() {
  const cardBtnWrapper = el('div', {
    className: 'mb-3',
  });
  const cardBtn = el('button', {
    className: 'btn btn-primary',
    type: 'submit',
    disabled: true,
  }, 'Оплатить');
  setChildren(cardBtnWrapper, cardBtn);
  return { cardBtnWrapper, cardBtn };
}
