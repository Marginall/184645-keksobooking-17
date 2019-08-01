'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var formControls = form.querySelectorAll('fieldset');
  var filter = document.querySelector('.map__filters');
  var filterControls = filter.querySelectorAll('fieldset, select');
  window.dragged = true;

  var onMainPinClick = function () {
    map.classList.remove('map--faded');
    window.requests.load(null, window.onSuccess, window.onSuccess);
    window.enableControls(formControls);
    window.enableControls(filterControls);
    window.dragged = false;
  };

  var onEnterKeyPress = function (evt) {
    if (evt.keyCode === window.constants.KEY_ENTER) {
      onMainPinClick();
    }
  };
  mainPin.addEventListener('keydown', onEnterKeyPress);

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

      if (mainPin.offsetLeft < (window.constants.MIN_WIDTH - window.constants.MAP_PIN_WIDTH / 2)) {
        mainPin.style.left = (window.constants.MIN_WIDTH - window.constants.MAP_PIN_WIDTH / 2) + 'px';
      }

      if (mainPin.offsetLeft > (window.constants.MAX_WIDTH - window.constants.MAP_PIN_WIDTH / 2)) {
        mainPin.style.left = (window.constants.MAX_WIDTH - window.constants.MAP_PIN_WIDTH / 2) + 'px';
      }

      if (mainPin.offsetTop < (window.constants.MIN_HEIGHT - window.constants.MAP_PIN_HEIGHT)) {
        mainPin.style.top = (window.constants.MIN_HEIGHT - window.constants.MAP_PIN_HEIGHT) + 'px';
      }

      if (mainPin.offsetTop > (window.constants.MAX_HEIGHT - window.constants.MAP_PIN_HEIGHT)) {
        mainPin.style.top = (window.constants.MAX_HEIGHT - window.constants.MAP_PIN_HEIGHT) + 'px';
      }

      window.setAdress(parseInt(mainPin.style.left, 10), parseInt(mainPin.style.top, 10));

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
