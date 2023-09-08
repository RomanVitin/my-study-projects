let addressBlock = document.querySelector('.contacts__grid__map__wrapper');
let closeAddressBlockBtn = document.querySelector('.contacts__grid__map__wrapper__info__close');

ymaps.ready(init);
function init(){
    var myMap = new ymaps.Map("map", {
        center: [55.760004, 37.600070],
        zoom: 13
    });
    myMap.controls.remove('zoomControl');
    myMap.controls.remove('geolocationControl');
    myMap.controls.remove('searchControl');
    myMap.controls.remove('trafficControl');
    myMap.controls.remove('typeSelector');
    myMap.controls.remove('fullscreenControl');
    myMap.controls.remove('rulerControl');
    myMap.behaviors.disable(["scrollZoom"]);
    var myPlacemark = new ymaps.Placemark([55.769534, 37.638440], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'images/map-point-icon.svg',
        iconImageSize: [12, 12],
    });
    myMap.geoObjects.add(myPlacemark);
    myPlacemark.events.add('click', () => {
      addressBlock.classList.remove('contacts__grid__map__wrapper--close');
      addressBlock.classList.add('contacts__grid__map__wrapper--active');
    });
}
closeAddressBlockBtn.addEventListener('click', () => {
  addressBlock.classList.remove('contacts__grid__map__wrapper--active');
  addressBlock.classList.add('contacts__grid__map__wrapper--close');
});



