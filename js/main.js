'use strict';
var items = [];
var maxWidth = 1200;
var minWidth = 1;
var maxHeight = 704;
var minHeght = 1;
var mapPins = document.querySelectorAll('.map__pins');

function pointsGenerator () {
  for(var i = 0; i < 8; i++) {
    var item = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        type: ['palace', 'flat', 'house', 'bungalo']
      },
      location: {
        x: Math.floor(Math.random() * (maxWidth - minWidth)) + minWidth,
        y: Math.floor(Math.random() * (maxHeight - minHeght)) + minHeght
      }
    };
    items.push(item);
  }
}

function randomizer (arr) {
  return Math.floor(Math.random() * (arr.length - 1)) + 1;
}

function pinGenerator () {
  var templatePin = document.querySelector('#pin').content;
  var fragment = document.createDocumentFragment();

  for(var i = 1; i < items.length; i++) {
    var element = templatePin.cloneNode(true);
    var button = element.querySelector('.map__pin');
    var image = element.querySelector('img');

    button.setAttribute('style', 'left:' + items[i].location.x + 'px;' + 'top:' + items[i].location.y + 'px;');
    image.setAttribute('src', items[i].author.avatar);
    image.setAttribute('alt', items[i].offer.type[(randomizer(items[i].offer.type))]);
	fragment.appendChild(element);
  };

  mapPins[0].appendChild(fragment);
}

pointsGenerator();
pinGenerator ();
