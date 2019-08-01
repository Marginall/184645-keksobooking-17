'use strict';

(function () {
  window.pinGenerate = function (items) {
    var map = document.querySelector('.map');
    var mapPins = map.querySelectorAll('.map__pins')[0];
    var fragment = document.createDocumentFragment();

    var elementGenerate = function (i) {
      var templatePin = document.querySelector('#pin').content;
      var element = templatePin.cloneNode(true);
      var button = element.querySelector('.map__pin');
      var image = element.querySelector('img');

      button.setAttribute('style', 'left:' + items[i].location.x + 'px;' + 'top:' + items[i].location.y + 'px;');
      button.setAttribute('data-offer', JSON.stringify(items[i]));
      image.setAttribute('src', items[i].author.avatar);
      image.setAttribute('alt', items[i].offer.type[(randomizer(items[i].offer.type))]);
      fragment.appendChild(element);
    };

    items.forEach(function (item, index) {
      if (item.offer && index < window.constants.NUMBER_OF_PINS) {
        elementGenerate(index);
      }
    });

    window.removeMapPins = function () {
      var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
      pins.forEach(function (item) {
        item.remove();
      });
    };

    if (window.sort) {
      window.removeMapPins();
    }

    mapPins.appendChild(fragment);

    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    var onClickPinHandler = function (evt) {
      var popups = document.querySelectorAll('.map__card');
      var data = JSON.parse(evt.currentTarget.getAttribute('data-offer'));
      popups.forEach(function (item) {
        item.remove();
      });
      evt.target.classList.add('map__pin--active');
      window.offerGenerate(data);
    };

    if (pins.length) {
      pins.forEach(function (item) {
        item.addEventListener('click', onClickPinHandler);
      });
    }
  };

  function randomizer(arr) {
    return Math.floor(Math.random() * arr.length) + 1;
  }
})();
