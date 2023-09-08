import { el, setChildren, mount } from 'redom';
import createCardNumber from './createCardNumber';
import createCardDate from './createCardDate';
import createCardCvv from './createCardCvv';
import createCardMail from './createCardMail';
import createCardBtn from './createCardBtn';
import createBankLogo from './createBankLogo';
import mirLogo from '../img/mir.svg';
import mastercardLogo from '../img/mastercard.svg';
import visaLogo from '../img/visa.svg';
import unionpayLogo from '../img/unionpay.svg';
import maestroLogo from '../img/maestro.svg';
import americanExpressLogo from '../img/american-express.svg';
import jcbLogo from '../img/jcb.svg';

const cardValid = require('card-validator');
const mailValid = require('email-validator');

export default function getPayForm() {
  let bankLogo = null;
  const cardForm = el('form', {
    className: 'row g-3 needs-validation',
    action: '!#',
    style: { maxWidth: '400px' },
  });
  const cardNumber = createCardNumber();
  const cardDate = createCardDate();
  const cardCvv = createCardCvv();
  const cardMail = createCardMail();
  const cardBtn = createCardBtn();
  setChildren(cardForm, [
    cardNumber.cardNumberWrapper,
    cardDate.cardDateWrapper,
    cardCvv.cardCvvWrapper,
    cardMail.cardMailWrapper,
    cardBtn.cardBtnWrapper,
  ]);
  cardNumber.numberInput.addEventListener('blur', () => {
    const validationNumber = cardValid.number(cardNumber.numberInput.value);
    if (!validationNumber.isPotentiallyValid) {
      cardNumber.errorBlock.style.display = 'block';
      cardNumber.numberInput.classList.add('is-invalid');
      cardBtn.cardBtn.disabled = true;
    }
    if (validationNumber.card) {
      cardNumber.errorBlock.style.display = '';
      cardNumber.numberInput.classList.add('is-valid');
      cardNumber.numberInput.classList.remove('is-invalid');
      if (cardForm.querySelectorAll('.is-valid').length === cardForm.getElementsByTagName('input').length) {
        cardBtn.cardBtn.disabled = false;
      }
      if (validationNumber.card.type === 'mir') {
        if (bankLogo !== null) bankLogo.remove();
        bankLogo = createBankLogo(mirLogo);
        mount(cardNumber.cardNumberWrapper, bankLogo);
      }
      if (validationNumber.card.type === 'mastercard') {
        if (bankLogo !== null) bankLogo.remove();
        bankLogo = createBankLogo(mastercardLogo);
        mount(cardNumber.cardNumberWrapper, bankLogo);
      }
      if (validationNumber.card.type === 'visa') {
        if (bankLogo !== null) bankLogo.remove();
        bankLogo = createBankLogo(visaLogo);
        mount(cardNumber.cardNumberWrapper, bankLogo);
      }
      if (validationNumber.card.type === 'unionpay') {
        if (bankLogo !== null) bankLogo.remove();
        bankLogo = createBankLogo(unionpayLogo);
        mount(cardNumber.cardNumberWrapper, bankLogo);
      }
      if (validationNumber.card.type === 'maestro') {
        if (bankLogo !== null) bankLogo.remove();
        bankLogo = createBankLogo(maestroLogo);
        mount(cardNumber.cardNumberWrapper, bankLogo);
      }
      if (validationNumber.card.type === 'american-express') {
        if (bankLogo !== null) bankLogo.remove();
        bankLogo = createBankLogo(americanExpressLogo);
        mount(cardNumber.cardNumberWrapper, bankLogo);
      }
      if (validationNumber.card.type === 'jcb') {
        if (bankLogo !== null) bankLogo.remove();
        bankLogo = createBankLogo(jcbLogo);
        mount(cardNumber.cardNumberWrapper, bankLogo);
      }
    } else if (bankLogo !== null) {
      bankLogo.remove();
    }
  });
  cardNumber.numberInput.addEventListener('input', () => {
    cardNumber.numberInput.classList.remove('is-invalid');
    cardNumber.numberInput.classList.remove('is-valid');
    cardNumber.errorBlock.style.display = '';
    cardBtn.cardBtn.disabled = true;
    if (bankLogo !== null) {
      bankLogo.remove();
    }
  });
  cardDate.dateInput.addEventListener('blur', () => {
    const validationDate = cardValid.expirationDate(cardDate.dateInput.value);
    if (!validationDate.isPotentiallyValid) {
      cardDate.errorBlock.style.display = 'block';
      cardDate.dateInput.classList.add('is-invalid');
      cardBtn.cardBtn.disabled = true;
    }
    if (validationDate.isValid) {
      cardDate.errorBlock.style.display = '';
      cardDate.dateInput.classList.add('is-valid');
      if (cardForm.querySelectorAll('.is-valid').length === cardForm.getElementsByTagName('input').length) {
        cardBtn.cardBtn.disabled = false;
      }
    }
  });
  cardDate.dateInput.addEventListener('input', () => {
    cardDate.errorBlock.style.display = '';
    cardDate.dateInput.classList.remove('is-valid');
    cardDate.dateInput.classList.remove('is-invalid');
    cardBtn.cardBtn.disabled = true;
  });
  cardCvv.cvvInput.addEventListener('blur', () => {
    const validationCvv = cardValid.cvv(cardCvv.cvvInput.value);
    if (!validationCvv.isPotentiallyValid) {
      cardCvv.errorBlock.style.display = 'block';
      cardCvv.cvvInput.classList.add('is-invalid');
      cardBtn.cardBtn.disabled = true;
    }
    if (validationCvv.isValid) {
      cardCvv.errorBlock.style.display = '';
      cardCvv.cvvInput.classList.add('is-valid');
      if (cardForm.querySelectorAll('.is-valid').length === cardForm.getElementsByTagName('input').length) {
        cardBtn.cardBtn.disabled = false;
      }
    }
  });
  cardCvv.cvvInput.addEventListener('input', () => {
    cardCvv.errorBlock.style.display = '';
    cardCvv.cvvInput.classList.remove('is-valid');
    cardCvv.cvvInput.classList.remove('is-invalid');
    cardBtn.cardBtn.disabled = true;
  });
  cardMail.mailInput.addEventListener('blur', () => {
    const validationMail = mailValid.validate(cardMail.mailInput.value);
    if (validationMail) {
      cardMail.errorBlock.style.display = '';
      cardMail.mailInput.classList.add('is-valid');
      if (cardForm.querySelectorAll('.is-valid').length === cardForm.getElementsByTagName('input').length) {
        cardBtn.cardBtn.disabled = false;
      }
    } else if (cardMail.mailInput.value) {
      cardMail.errorBlock.style.display = 'block';
      cardMail.mailInput.classList.add('is-invalid');
      cardBtn.cardBtn.disabled = true;
    }
  });
  cardMail.mailInput.addEventListener('input', () => {
    cardMail.errorBlock.style.display = '';
    cardMail.mailInput.classList.remove('is-valid');
    cardMail.mailInput.classList.remove('is-invalid');
    cardBtn.cardBtn.disabled = true;
  });
  return cardForm;
}
