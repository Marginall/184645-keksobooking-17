'use strict';

(function () {
  window.pinGenerate = function (items) {
    var map = document.querySelector('.map');
    var mapPins = map.querySelectorAll('.map__pins')[0];
    var templatePin = document.querySelector('#pin').content;
    var fragment = document.createDocumentFragment();
    var PINS_LENGTH = 5;

    var elementGenerate = function (i) {
      var element = templatePin.cloneNode(true);
      var button = element.querySelector('.map__pin');
      var image = element.querySelector('img');

      button.setAttribute('style', 'left:' + items[i].location.x + 'px;' + 'top:' + items[i].location.y + 'px;');
      image.setAttribute('src', items[i].author.avatar);
      image.setAttribute('alt', items[i].offer.type[(randomizer(items[i].offer.type))]);
      fragment.appendChild(element);
    };

    items.forEach(function (item, index, array) {
      if (index < PINS_LENGTH) {
        elementGenerate(index);
      }
    });

    if (window.sort) {
      while (mapPins.firstChild) {
        mapPins.removeChild(mapPins.firstChild);
      }
    }

    mapPins.appendChild(fragment);
  };

  function randomizer(arr) {
    return Math.floor(Math.random() * arr.length) + 1;
  }
})();
