'use strict';

(function () {
  window.onLoad = function () {
    var map = document.querySelector('.map');
    var mainPin = document.querySelector('.map__pin--main');
    var template = document.querySelector('#success').content;
    var element = template.cloneNode(true);
    var fragment = document.createDocumentFragment();
    var START_X = 570;
    var START_Y = 375;
    var KEY_ESC = 27;
    window.dragged = true;

    fragment.appendChild(element);
    map.appendChild(fragment);
    window.resetForm();
    window.removeMapPins();
    window.disableControls();
    map.classList.add('map--faded');
    mainPin.setAttribute('style', 'left:' + START_X + 'px;' + 'top:' + START_Y + 'px;');

    var removeOverlay = function (evt) {
      var overlay = document.querySelector('.success');
      overlay.remove();
      if (evt.keyCode === KEY_ESC) {
        overlay.remove();
      }

      document.removeEventListener('click', removeOverlay);
      document.removeEventListener('keydown', removeOverlay);
    };

    document.addEventListener('click', removeOverlay);
    document.addEventListener('keydown', removeOverlay);
  }
})();
