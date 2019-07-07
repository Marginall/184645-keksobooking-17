'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var formControls = form.querySelectorAll('fieldset');
  var MAX_WIDTH = 1200;
  var MIN_WIDTH = 1;
  var MAX_HEIGHT = 630;
  var MIN_HEIGHT = 130;
  var MAP_PIN_WIDTH = 65;
  var MAP_PIN_HEIGHT = 44 + 22;
  var dragged = true;

  var setAdress = function (x, y) {
    var address = form.querySelector('#address');
    address.setAttribute('value', (x + (Math.floor(MAP_PIN_WIDTH / 2)) + ', ' + (y + MAP_PIN_HEIGHT)));
  };

  var onMainPinClick = function () {
    map.classList.remove('map--faded');
    window.load();
    window.enableControls(formControls);

    dragged = false;
  };

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
})();
