'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var formControls = form.querySelectorAll('fieldset');
  window.dragged = true;

  var setAdress = function (x, y) {
    var address = form.querySelector('#address');
    address.setAttribute('value', (x + (Math.floor(window.constants.MAP_PIN_WIDTH / 2)) + ', ' + (y + window.constants.MAP_PIN_HEIGHT)));
  };

  var onMainPinClick = function () {
    map.classList.remove('map--faded');
    window.requests.load(null, window.onSuccess, window.onSuccess);
    window.enableControls(formControls);
    window.dragged = false;
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

      if (parseInt(mainPin.style.left, 10) < window.constants.MIN_WIDTH) {
        mainPin.style.left = window.constants.MIN_WIDTH + 'px';
      }

      if (parseInt(mainPin.style.left, 10) > window.constants.MAX_WIDTH - window.constants.MAP_PIN_WIDTH) {
        mainPin.style.left = window.constants.MAX_WIDTH - window.constants.MAP_PIN_WIDTH + 'px';
      }

      if (startCoords.y < window.constants.MIN_HEIGHT) {
        mainPin.style.top = window.constants.MIN_HEIGHT + 'px';
      }

      if (startCoords.y > window.constants.MAX_HEIGHT) {
        mainPin.style.top = window.constants.MAX_HEIGHT + 'px';
      }

      setAdress(parseInt(mainPin.style.left, 10), parseInt(mainPin.style.top, 10));

      if (window.dragged) {
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
