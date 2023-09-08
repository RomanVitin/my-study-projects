import { el, setChildren } from 'redom';
import Inputmask from 'inputmask';

export default function createCardNumber() {
  const cardNumberWrapper = el('div', {
    className: 'col-md-12 position-relative',
  });
  const numberInput = el('input', {
    className: 'form-control position-relative',
    id: 'card-number',
  });
  const errorBlock = el('div', {
    className: 'invalid-feedback',
  }, 'Неправильный номер карты');
  setChildren(cardNumberWrapper, [
    el('label', {
      className: 'form-label',
      for: 'card-number',
    }, 'Номер карты'),
    numberInput,
    errorBlock,
  ]);
  Inputmask('9999 9999 9999 9999 [99]').mask(numberInput);

  return { cardNumberWrapper, numberInput, errorBlock };
}
