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
      if (evt.keyCode === window.constants.KEY_ESC) {
        overlay.remove();
      }

      document.removeEventListener('click', removeOverlay);
      document.removeEventListener('keydown', removeOverlay);
    };

    document.addEventListener('click', removeOverlay);
    document.addEventListener('keydown', removeOverlay);
  };
})();
