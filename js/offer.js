'use strict';

(function () {
  window.offerGenerate = function (item, index) {
    var map = document.querySelector('.map');
    var templateOffer = document.querySelector('#card').content;
    var element = templateOffer.cloneNode(true);
    var card = element.querySelector('.map__card');
    var fragment = document.createDocumentFragment();
    var title = element.querySelector('.popup__title');
    var address = element.querySelector('.popup__text--price');
    var price = element.querySelector('.popup__text--price');
    var type = element.querySelector('.popup__type');
    var capacity = element.querySelector('.popup__text--capacity');
    var time = element.querySelector('.popup__text--time');
    var featuresBlock = element.querySelector('.popup__features');
    var features = featuresBlock.querySelectorAll('.popup__feature');
    var description = element.querySelector('.popup__description');
    var photoBlock = element.querySelector('.popup__photos');
    var photo = photoBlock.querySelector('.popup__photo');
    var image = element.querySelector('.popup__avatar');

    title.textContent = items[index].offer.title;
    address.textContent = items[index].offer.address;
    price.innerHTML = items[index].offer.price + ' ' + '&#x20bd;' + '<span>/ночь</span>';
    description.textContent = items[index].offer.description;
    capacity.textContent = items[index].offer.rooms + ' комнаты для ' + items[index].offer.guests + ' гостей';
    time.textContent = 'Заезд после' + ' ' + items[index].offer.checkin + ', выезд до ' + items[index].offer.checkout;
    image.setAttribute('src', items[index].author.avatar);

    type.textContent = function () {
      switch (items[index].offer.type) {
        case 'flat':
          return 'Квартира';
        case 'bungalo':
          return 'Бунгало';
        case 'house':
          return 'Дом';
        case 'palace':
          return 'Дворец';
        default:
          throw new Error('Неизвестный тип');
      }
    }();

    var tempFeatures = [];
    items[index].offer.features.forEach(function (item, i) {
      features.forEach(function (feature) {
        if (feature.classList.contains('popup__feature--' + items[index].offer.features[i])) {
          tempFeatures.push(feature);
        }
      });
    });
    featuresBlock.innerHTML = '';

    tempFeatures.forEach(function (item) {
      featuresBlock.appendChild(item);
    });

    items[index].offer.photos.forEach(function (item) {
      var newImage = photo.cloneNode(true);
      newImage.src = item;
      newImage.alt = items[index].offer.title;
      photoBlock.appendChild(newImage);
    });
    photoBlock.removeChild(photoBlock.children[0]);

    card.classList.add('hidden');
    fragment.appendChild(element);
    map.appendChild(fragment);
  };
})();
