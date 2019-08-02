'use strict';

(function () {
  window.onLoad = function () {
    var map = document.querySelector('.map');
    var template = document.querySelector('#success').content;
    var element = template.cloneNode(true);
    var fragment = document.createDocumentFragment();
    window.dragged = true;
    window.resetForm();
    fragment.appendChild(element);
    map.appendChild(fragment);

    if (window.popupShow) {
      window.closePopup();
    }

    var removeOverlay = function (evt) {
      var overlay = document.querySelector('.success');
      overlay.remove();
    };

    var onScreenClick = function () {
      removeOverlay();
      document.removeEventListener('click', onScreenClick);
      document.removeEventListener('keydown', onPressEscape);
    };

    var onPressEscape = function (evt) {
      if (evt.keyCode === window.constants.KEY_ESC) {
        removeOverlay();
        document.removeEventListener('click', onScreenClick);
        document.removeEventListener('keydown', onPressEscape);
      }
    };

    document.addEventListener('click', onScreenClick);
    document.addEventListener('keydown', onPressEscape);
  };
})();
