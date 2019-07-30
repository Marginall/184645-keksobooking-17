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
    var tempFeatures = [];

    var setHiddenBlock = function (block) {
      block.setAttribute('style', 'display: none;');
    };

    var generateFeature = function () {
      item.offer.features.forEach(function (el) {
        features.forEach(function (feature) {
          if (feature.classList.contains('popup__feature--' + el)) {
            tempFeatures.push(feature);
          }
        });
      });

      featuresBlock.innerHTML = '';
      tempFeatures.forEach(function (el) {
        featuresBlock.appendChild(el);
      });
    };

    var getOfferType = function () {
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
    };

    var generatePhotos = function () {
      item.offer.photos.forEach(function (src) {
        var newImage = photo.cloneNode(true);
        newImage.src = src;
        newImage.alt = item.offer.title;
        photoBlock.appendChild(newImage);
      });
      photoBlock.removeChild(photoBlock.children[0]);
    };

    item.offer.title.length ? title.textContent = item.offer.title : setHiddenBlock(title);
    item.offer.address.length ? address.textContent = item.offer.address : setHiddenBlock(address);
    item.offer.price.length ? price.innerHTML = item.offer.price + ' ' + '&#x20bd;' + '<span>/ночь</span>' : setHiddenBlock(price);
    item.offer.description.length ? description.textContent = item.offer.description : setHiddenBlock(description);
    item.offer.rooms.length ? capacity.textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей' : setHiddenBlock(capacity);
    item.offer.checkin.length ? time.textContent = 'Заезд после' + ' ' + item.offer.checkin + ', выезд до ' + item.offer.checkout : setHiddenBlock(time);
    item.author.avatar ? image.setAttribute('src', item.author.avatar) : setHiddenBlock(image);
    item.offer.features.length ? generateFeature() : setHiddenBlock(featuresBlock);
    item.offer.type.length ? getOfferType() : setHiddenBlock(type);
    item.offer.photos.length ? generatePhotos() : setHiddenBlock(photoBlock);

    fragment.appendChild(element);
    map.appendChild(fragment);

    window.onCloseHandler = function () {
      var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
      pins.forEach(function (pin) {
        pin.classList.remove('map__pin--active');
      });
      card.remove();
      close.removeEventListener('click', window.onCloseHandler);
      document.removeEventListener('keydown', onEscapeKeyClose);
    };

    var onEscapeKeyClose = function (evt) {
      if (evt.keyCode === window.constants.KEY_ESC) {
        window.onCloseHandler();
      }
    };

    close.addEventListener('click', window.onCloseHandler);
    document.addEventListener('keydown', onEscapeKeyClose);
  };
})();
