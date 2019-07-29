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

  errorButton.addEventListener('click', function () {
    overlay.remove();
  });

  var removeOverlay = function (evt) {
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
