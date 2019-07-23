'use strict';

(function () {
  var load = function (type, url) {
    return function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      var requestHandler = function () {
        if (xhr.status === 200) {
          window.items = xhr.response;
          onSuccess(window.items);
        } else {
          onError();
        }
      };

      xhr.addEventListener('load', requestHandler);

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + (xhr.timeout / 1000) + 'секунд');
      });

      xhr.open(type, url);
      xhr.send(data);
    };
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

  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var SEND_URL = 'https://js.dump.academy/keksobooking';

  window.requests = {
    send: load('POST', SEND_URL),
    load: load('GET', LOAD_URL)
  };
})();
