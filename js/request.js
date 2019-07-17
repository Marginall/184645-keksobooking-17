'use strict';

(function () {
  window.load = function (type, url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(type, url);
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

  var onError = function () {
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

  var onSuccess = function (items) {
    window.pinGenerate(items);
  }

  window.request = {
    load: window.load('POST', LOAD_URL),
    upload: window.load('POST', UPLOAD_URL)
  };
})();
