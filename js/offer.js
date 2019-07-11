'use strict';

(function () {
  window.offerGenerate = function (item) {
    var map = document.querySelector('.map');
    var templateOffer = document.querySelector('#card').content;
    var element = templateOffer.cloneNode(true);
    var card = element.querySelector('.map__card');
    var close = card.querySelector('.popup__close');
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
    var KEY_ESC = 27;

    title.textContent = item.offer.title;
    address.textContent = item.offer.address;
    price.innerHTML = item.offer.price + ' ' + '&#x20bd;' + '<span>/ночь</span>';
    description.textContent = item.offer.description;
    capacity.textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
    time.textContent = 'Заезд после' + ' ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
    image.setAttribute('src', item.author.avatar);

    type.textContent = function () {
      switch (item.offer.type) {
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
    item.offer.features.forEach(function (element, i) {
      features.forEach(function (feature) {
        if (feature.classList.contains('popup__feature--' + item.offer.features[i])) {
          tempFeatures.push(feature);
        }
      });
    });
    featuresBlock.innerHTML = '';
    tempFeatures.forEach(function (element) {
      featuresBlock.appendChild(element);
    });

    item.offer.photos.forEach(function (image) {
      var newImage = photo.cloneNode(true);
      newImage.src = image;
      newImage.alt = item.offer.title;
      photoBlock.appendChild(newImage);
    });
    photoBlock.removeChild(photoBlock.children[0]);

    fragment.appendChild(element);
    map.appendChild(fragment);

    var onCloseHandler = function () {
      card.parentNode.removeChild(card);
    }

    close.addEventListener('click', onCloseHandler);
    document.addEventListener('keydown', function (evt) {

      if (evt.keyCode === KEY_ESC) {
        onCloseHandler();
      }
    });
  };
})();
