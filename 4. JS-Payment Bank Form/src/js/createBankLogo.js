import { el } from 'redom';

export default function createBankLogo(imgSrc) {
  const bankLogo = el('img', {
    className: 'img-fluid position-absolute',
    src: imgSrc,
    style: {
      top: '30px',
      right: '10px',
      width: '60px',
      height: '40px',
      borderRadius: '10px',
    },
    alt: 'bank-logo',
  });
  return bankLogo;
}
