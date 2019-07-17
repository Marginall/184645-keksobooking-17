'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var SEND_URL = 'https://js.dump.academy/keksobooking';

  var load = function (type, url) {
    return function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open(type, url);
      xhr.send();

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          window.items = xhr.response;
          onSuccess(window.items);
        } else {
          onError();
        }
      });
    }
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

  window.onSuccess = function (items) {
    window.pinGenerate(items);
  }

  window.onLoad = function (items) {
    console.load('load');
  }

  window.requests = {
    load: load('GET', LOAD_URL),
    send: load('POST', SEND_URL)
  };
})();
