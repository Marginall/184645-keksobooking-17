'use strict';

window.onError = function () {
  var block = document.querySelector('main');
  var template = document.querySelector('#error').content;
  var element = template.cloneNode(true);
  var fragment = document.createDocumentFragment();
  fragment.appendChild(element);
  block.appendChild(fragment);

  var errorButton = document.querySelector('.error__button');
  var overlay = block.querySelector('.error');

  var removeOverlay = function () {
    overlay.remove();
  };

  errorButton.addEventListener('click', function () {
    removeOverlay();
  });

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
