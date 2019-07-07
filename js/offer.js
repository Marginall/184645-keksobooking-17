'use strict';

(function () {
  window.offerGenerate = function(items) {
    var map = document.querySelector('.map');
    var templateOffer = document.querySelector('#card').content;
    var element = templateOffer.cloneNode(true);
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
    let image = element.querySelector('.popup__avatar');

    title.textContent = items[1].offer.title;
    address.textContent = items[1].offer.address;
    price.innerHTML = items[1].offer.price + ' ' + '&#x20bd;' + ' ' + '<span>/ночь</span>';
    description.textContent = items[1].offer.description;
    capacity.textContent = items[1].offer.rooms +' ' + 'комнаты для' +' ' + items[1].offer.guests + ' ' + 'гостей';
    time.textContent = 'Заезд после' + ' ' + items[1].offer.checkin + ', выезд до ' + items[1].offer.checkout;
    image.setAttribute('src', items[1].author.avatar);

    var getTypes = function (type) {
      switch (type) {
        case 'flat':
          return 'Квартира';
        case 'bungalo':
          return 'Бунгало';
        case 'house':
          return 'Дом';
        case 'palace':
          return 'Дворец';
      }
    };

    type.textContent = getTypes(items[1].offer.type);

    var tempFeatures = [];
    items[1].offer.features.forEach(function (item, i) {
      features.forEach(function(feature, index) {
        if (feature.classList.contains('popup__feature--' + items[1].offer.features[i])) {
          tempFeatures.push(feature);
        }
      });
    });
    featuresBlock.innerHTML = '';

    tempFeatures.forEach(function(item, index) {
      featuresBlock.appendChild(item);
    });

    items[1].offer.photos.forEach(function (item, i) {
      var newImage = photo.cloneNode(true);
      newImage.src = item;
      newImage.alt = items[1].offer.title;
      photoBlock.appendChild(newImage);
    });
    photoBlock.removeChild(photoBlock.children[0]);

    fragment.appendChild(element);
    map.appendChild(fragment);
  };
})();
