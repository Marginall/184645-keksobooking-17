'use strict';

(function () {
  window.resetForm = function () {
    var map = document.querySelector('.map');
    var mainPin = document.querySelector('.map__pin--main');
    var form = document.querySelector('.ad-form');
    window.dragged = true;

    form.reset();
    window.removeMapPins();
    window.disableControls();
    map.classList.add('map--faded');
    mainPin.setAttribute('style', 'left:' + window.constants.START_X + 'px;' + 'top:' + window.constants.START_Y + 'px;');
  };
})();
