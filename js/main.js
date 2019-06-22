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
var form = document.querySelector('.ad-form');
var formControls = form.querySelectorAll('fieldset');
var filter = document.querySelector('.map__filters');
var filterControls = filter.querySelectorAll('fieldset, select');
var type = form.querySelector('#type');
var price = form.querySelector('#price');
var selectTime = form.querySelector('.ad-form__element--time');
var timeIn = form.querySelector('#timein');
var timeOut = form.querySelector('#timeout');
var MAP_PIN_WIDTH = 65;
var MAP_PIN_HEIGHT = 44 + 22;
var dragged = true;

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

var setAdress = function (x, y) {
  var address = form.querySelector('#address');
  address.setAttribute('value', (x + (Math.floor(MAP_PIN_WIDTH / 2)) + ', ' + (y + MAP_PIN_HEIGHT)));
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

  dragged = false;
};

var onChangeType = function (evt) {
  if (evt.target.value === 'bungalo') {
    price.setAttribute('min', 0);
    price.setAttribute('placeholder', '0');
  } else if (evt.target.value === 'flat') {
    price.setAttribute('min', 1000);
    price.setAttribute('placeholder', '1000');
  } else if (evt.target.value === 'house') {
    price.setAttribute('min', 5000);
    price.setAttribute('placeholder', '5000');
  } else if (evt.target.value === 'palace') {
    price.setAttribute('min', 10000);
    price.setAttribute('placeholder', '10000');
  }
};

type.addEventListener('change', onChangeType);

selectTime.addEventListener('change', function (evt) {
  var index = evt.target.selectedIndex;
  var option = evt.target.querySelectorAll('option');

  if (evt.target === timeIn) {
    option = timeOut.querySelectorAll('option');
  }

  if (evt.target === timeOut) {
    option = timeIn.querySelectorAll('option');
  }

  for (var i = 0; i < option.length; i++) {
    option[i].removeAttribute('selected');

    if (index === i) {
      option[i].selected = true;
    }
  }
});

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';

    if (parseInt(mainPin.style.left, 10) < MIN_WIDTH) {
      mainPin.style.left = MIN_WIDTH + 'px';
    }

    if (parseInt(mainPin.style.left, 10) > MAX_WIDTH - MAP_PIN_WIDTH) {
      mainPin.style.left = MAX_WIDTH - MAP_PIN_WIDTH + 'px';
    }

    if (startCoords.y < MIN_HEIGHT) {
      mainPin.style.top = MIN_HEIGHT + 'px';
    }

    if (startCoords.y > MAX_HEIGHT) {
      mainPin.style.top = MAX_HEIGHT + 'px';
    }

    setAdress(parseInt(mainPin.style.left, 10), parseInt(mainPin.style.top, 10));

    if (dragged) {
      onMainPinClick();
    }
  };

  var onMouseUp = function (moveEvt) {
    moveEvt.preventDefault();

    onMouseMove(moveEvt);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

disableControls();
