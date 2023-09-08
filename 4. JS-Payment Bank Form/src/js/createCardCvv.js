import { el, setChildren } from 'redom';
import Inputmask from 'inputmask';

export default function createCardCvv() {
  const cardCvvWrapper = el('div', {
    className: 'col-md-4 position-relative',
  });
  const cvvInput = el('input', {
    className: 'form-control',
    id: 'card-cvv',
    required: true,
  });
  const errorBlock = el('div', {
    className: 'invalid-feedback',
  }, 'Неверный код');
  setChildren(cardCvvWrapper, [
    el('label', {
      className: 'form-label',
      for: 'card-cvv',
    }, 'CVV-код'),
    cvvInput,
    errorBlock,
  ]);
  Inputmask('999').mask(cvvInput);

  return { cardCvvWrapper, cvvInput, errorBlock };
}
