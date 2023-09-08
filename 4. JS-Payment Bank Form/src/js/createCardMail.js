import { el, setChildren } from 'redom';
import Inputmask from 'inputmask';

export default function createCardMail() {
  const cardMailWrapper = el('div', {
    className: 'col-md-12 position-relative',
  });
  const mailInput = el('input', {
    className: 'form-control',
    id: 'card-mail',
  });
  const errorBlock = el('div', {
    className: 'invalid-feedback',
  }, 'Неверный формат');
  setChildren(cardMailWrapper, [
    el('label', {
      className: 'form-label',
      for: 'card-mail',
    }, 'Почта для отправки чека'),
    mailInput,
    errorBlock,
  ]);
  Inputmask('email').mask(cardMailWrapper.getElementsByTagName('input'));

  return { cardMailWrapper, mailInput, errorBlock };
}
