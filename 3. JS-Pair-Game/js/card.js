export class Card {
  _open = false
  _success = false
  constructor(container, cardNumber, flip) {
    this.container = container;
    this.createElement(cardNumber);
    this.flip = flip;
  }
  createElement(cardNumber){
    this.card = document.createElement('div')
    this.number = document.createElement('span')
    this.card.classList.add('card', 'main-card', 'mb-3', 'close-card')
    this.number.style.visibility = 'hidden'
    this.number.style.maxHeight = '100%'
    this.cardNumber = cardNumber
    this.card.style.width = '20vw'
    this.card.style.height = '20vh'
    this.card.append(this.number)
    this.card.addEventListener('click', () => {
      if (!this.open && !this.success) {
        this.flip(this);
      }
   })
   this.container.append(this.card);
  }

  set cardNumber(value) {
    this.number.textContent = value;
  }
  get cardNumber() {
    return this.card.textContent;
  }

  set open(value) {
    this._open = value;
    if (value) {
      this.card.classList.remove('close-card')
      this.number.style.visibility = 'visible'
    } else {
      this.card.classList.add('close-card')
      this.number.style.visibility = 'hidden'
    }
  }
  get open() {
    return this._open;
  }

  set success(value) {
    this._success = value;
    value ? this.card.classList.add('success') : this.card.classList.remove('success')
  }
  get success() {
    return this._success;
  }
}

export class AmazingCard extends Card {
  constructor(container, cardNumber, flip) {
    super(container, cardNumber, flip)
  }

  set cardNumber(value) {
    const cardsImgArray = [
        '',
        './img/дельфин.jpg',
        './img/касатка.jpg',
        './img/коралл.jpg',
        './img/морская-звезда.jpg',
        './img/водоросль.jpg'
    ]
    const img = document.createElement('img');
    img.onerror = () => {
        img.src = './img/error.jpg';
    };
    img.src = cardsImgArray[value]
    img.style.maxHeight = '100%'
    img.style.width = '100%'
    this.number.append(img)
  }

  get cardNumber() {
      return this.number.innerHTML;
  }
}




