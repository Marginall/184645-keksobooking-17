'use strict';
var items = [];
var MAX_WIDTH = 1200;
var MIN_WIDTH = 1;
var MAX_HEIGHT = 704;
var MIN_HEIGHT = 1;
var WIZARDS = 8;
var mapPins = document.querySelectorAll('.map__pins')[0];

function pointsGenerator() {
  for (var i = 1; i <= WIZARDS; i++) {
    var item = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        type: ['palace', 'flat', 'house', 'bungalo']
      },
      location: {
        x: Math.floor(Math.random() * (MAX_WIDTH - MIN_WIDTH)) + MIN_WIDTH,
        y: Math.floor(Math.random() * (MAX_HEIGHT - MIN_HEIGHT)) + MIN_HEIGHT
      }
    };
    items.push(item);
  }
}

function randomizer(arr) {
  return Math.floor(Math.random() * arr.length) + 1;
}

function pinGenerator() {
  var templatePin = document.querySelector('#pin').content;
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < items.length; i++) {
    var element = templatePin.cloneNode(true);
    var button = element.querySelector('.map__pin');
    var image = element.querySelector('img');

    button.setAttribute('style', 'left:' + items[i].location.x + 'px;' + 'top:' + items[i].location.y + 'px;');
    image.setAttribute('src', items[i].author.avatar);
    image.setAttribute('alt', items[i].offer.type[(randomizer(items[i].offer.type))]);
    fragment.appendChild(element);
  };
  mapPins.appendChild(fragment);
}

pointsGenerator();
pinGenerator();
