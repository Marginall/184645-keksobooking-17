'use strict';

(function () {
  var load = function (type, url) {
    return function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      var requestHandler = function () {
        if (xhr.status === window.constants.SUCCESS_STATUS) {
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

  window.onSuccess = function (items) {
    window.pinGenerate(items);
  };

  window.requests = {
    send: load('POST', window.constants.SEND_URL),
    load: load('GET', window.constants.LOAD_URL)
  };
})();
