'use strict';

(function () {
  window.load = function (url) {
    url = url || 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', url);
    xhr.send();

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        window.items = xhr.response;
        onSuccess(window.items);
      } else {
        window.onError();
      }
    });
  };

  window.onError = function () {
    var block = document.querySelector('main');
    var template = document.querySelector('#error').content;
    var element = template.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(element);
    block.appendChild(fragment);

    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      var errorBlock = block.querySelector('.error');
      errorBlock.remove();
    });
  };

  function onSuccess(items) {
    window.pinGenerate(items);
  }
})();
