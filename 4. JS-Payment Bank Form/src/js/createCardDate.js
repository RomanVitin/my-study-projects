import { el, setChildren } from 'redom';
import Inputmask from 'inputmask';

export default function createCardDate() {
  const cardDateWrapper = el('div', {
    className: 'col-md-8 position-relative',
  });
  const dateInput = el('input', {
    className: 'form-control',
    id: 'card-date',
  });
  const errorBlock = el('div', {
    className: 'invalid-feedback',
  }, 'Неверная дата');
  setChildren(cardDateWrapper, [
    el('label', {
      className: 'form-label',
      for: 'card-date',
    }, 'Дата окончания карты'),
    dateInput,
    errorBlock,
  ]);
  Inputmask('99 / 99', { placeholder: 'mm / yy' }).mask(dateInput);

  return { cardDateWrapper, dateInput, errorBlock };
}
