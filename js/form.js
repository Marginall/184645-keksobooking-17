'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var formControls = form.querySelectorAll('fieldset');
  var filter = document.querySelector('.map__filters');
  var filterControls = filter.querySelectorAll('fieldset, select');
  var type = form.querySelector('#type');
  var price = form.querySelector('#price');
  var selectTime = form.querySelector('.ad-form__element--time');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');

  function disableControls() {
    for (var i = 0; i < formControls.length; i++) {
      formControls[i].setAttribute('disabled', 'disabled');
    }

    for (var j = 0; j < filterControls.length; j++) {
      formControls[j].setAttribute('disabled', 'disabled');
    }
  }

  window.enableControls = function (elements) {
    form.classList.remove('ad-form--disabled');

    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }

    for (var j = 0; j < elements.length; j++) {
      elements[j].removeAttribute('disabled');
    }
  };

  var onChangeType = function (evt) {
    if (evt.target.value === 'bungalo') {
      price.setAttribute('min', 0);
      price.setAttribute('placeholder', '0');
    } else if (evt.target.value === 'flat') {
      price.setAttribute('min', 1000);
      price.setAttribute('placeholder', '1000');
    } else if (evt.target.value === 'house') {
      price.setAttribute('min', 5000);
      price.setAttribute('placeholder', '5000');
    } else if (evt.target.value === 'palace') {
      price.setAttribute('min', 10000);
      price.setAttribute('placeholder', '10000');
    }
  };

  type.addEventListener('change', onChangeType);

  selectTime.addEventListener('change', function (evt) {
    var index = evt.target.selectedIndex;
    var option = evt.target.querySelectorAll('option');

    if (evt.target === timeIn) {
      option = timeOut.querySelectorAll('option');
    }

    if (evt.target === timeOut) {
      option = timeIn.querySelectorAll('option');
    }

    for (var i = 0; i < option.length; i++) {
      option[i].removeAttribute('selected');

      if (index === i) {
        option[i].selected = true;
      }
    }
  });

  disableControls();
})();