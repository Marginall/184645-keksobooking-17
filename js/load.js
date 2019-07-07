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
        onSuccess(xhr.response);
      } else {
        onError();
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
  };

  function onSuccess(items) {
    window.pinGenerate(items);
    window.offerGenerate(window.items);
  }

})();
