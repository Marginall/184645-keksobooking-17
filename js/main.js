'use strict';
var items = [];
var MAX_WIDTH = 1200;
var MIN_WIDTH = 1;
var MAX_HEIGHT = 630;
var MIN_HEIGHT = 130;
var POINTS_LENGTH = 8;
var map = document.querySelector('.map');
var mapPins = map.querySelectorAll('.map__pins')[0];
var mainPin = map.querySelector('.map__pin--main');
var mainPinStyle = window.getComputedStyle(mainPin);
var MAP_PIN_WIDTH = parseInt(mainPinStyle.getPropertyValue('width'), 10);
var MAP_PIN_HEIGHT = parseInt(mainPinStyle.getPropertyValue('height'), 10);
var MAP_PIN_TOP = parseInt(mainPinStyle.getPropertyValue('top'), 10);
var MAP_PIN_LEFT = parseInt(mainPinStyle.getPropertyValue('left'), 10);
var form = document.querySelector('.ad-form');
var formControls = form.querySelectorAll('fieldset');
var filter = document.querySelector('.map__filters');
var filterControls = filter.querySelectorAll('fieldset, select');
var positionX = Math.round(MAP_PIN_TOP + MAP_PIN_HEIGHT / 2);
var positionY = Math.round(MAP_PIN_LEFT + MAP_PIN_WIDTH / 2);

function pointsGenerate() {
  for (var i = 1; i <= POINTS_LENGTH; i++) {
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

function pinGenerate() {
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
  }

  mapPins.appendChild(fragment);
}

function disableControls() {
  for (var i = 0; i < formControls.length; i++) {
    formControls[i].setAttribute('disabled', 'disabled');
  }

  for (var j = 0; j < filterControls.length; j++) {
    formControls[j].setAttribute('disabled', 'disabled');
  }
}

var setAdress = function () {
  var address = form.querySelector('#address');
  address.setAttribute('value', positionX + ', ' + positionY);
};

var onMainPinClick = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');

  pointsGenerate();
  pinGenerate();

  for (var i = 0; i < formControls.length; i++) {
    formControls[i].removeAttribute('disabled');
  }

  for (var j = 0; j < filterControls.length; j++) {
    filterControls[j].removeAttribute('disabled');
  }

  mainPin.removeEventListener('click', onMainPinClick);
};

disableControls();
setAdress();
mainPin.addEventListener('click', onMainPinClick);
