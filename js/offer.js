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
    window.popupShow = true;

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

    title.textContent = item.offer.title.length ? item.offer.title : setHiddenBlock(title);
    address.textContent = item.offer.address.length ? item.offer.address : setHiddenBlock(address);
    price.innerHTML = item.offer.price > -1 ? item.offer.price + ' ' + '&#x20bd;' + '<span>/ночь</span>' : setHiddenBlock(price);
    description.textContent = item.offer.description.length ? item.offer.description : setHiddenBlock(description);
    capacity.textContent = item.offer.rooms > -1 ? item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей' : setHiddenBlock(capacity);
    time.textContent = item.offer.checkin.length ? 'Заезд после' + ' ' + item.offer.checkin + ', выезд до ' + item.offer.checkout : setHiddenBlock(time);

    if (item.author.avatar) {
      image.setAttribute('src', item.author.avatar);
    } else {
      setHiddenBlock(image);
    }

    if (item.offer.photos.length) {
      generatePhotos();
    } else {
      setHiddenBlock(photoBlock);
    }

    if (item.offer.features.length) {
      generateFeature();
    } else {
      setHiddenBlock(featuresBlock);
    }

    if (item.offer.type.length) {
      getOfferType();
    } else {
      setHiddenBlock(type);
    }

    fragment.appendChild(element);
    map.appendChild(fragment);

    window.closePopup = function () {
      var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
      pins.forEach(function (pin) {
        pin.classList.remove('map__pin--active');
      });
      card.remove();
      close.removeEventListener('click', onCloseClick);
      document.removeEventListener('keydown', onEscapeKeyClose);
    };

    var onEscapeKeyPress = function (evt) {
      if (evt.keyCode === window.constants.KEY_ESC) {
        window.closePopup();
      }
    };

    var onCloseClick = function () {
      window.closePopup();
    };

    close.addEventListener('click', onCloseClick);
    document.addEventListener('keydown', onEscapeKeyPress);
  };
})();
