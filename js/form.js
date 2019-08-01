'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var formControls = form.querySelectorAll('fieldset');
  var address = form.querySelector('#address');
  var filter = document.querySelector('.map__filters');
  var filterControls = filter.querySelectorAll('fieldset, select');
  var type = form.querySelector('#type');
  var price = form.querySelector('#price');
  var selectTime = form.querySelector('.ad-form__element--time');
  var roomNumber = form.querySelector('.ad-form__element--room select');
  var capacity = form.querySelector('.ad-form__element--capacity select');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var resetFormButton = form.querySelector('.ad-form__reset');

  window.disableControls = function () {
    form.classList.add('ad-form--disabled');

    for (var i = 0; i < formControls.length; i++) {
      formControls[i].setAttribute('disabled', 'disabled');
    }

    for (var j = 0; j < filterControls.length; j++) {
      filterControls[j].setAttribute('disabled', 'disabled');
    }
  };

  if (roomNumber.value === '1') {
    capacity.item(0).style = 'display: none';
    capacity.item(1).style = 'display: none';
    capacity.item(2).removeAttribute('style');
    capacity.item(2).selected = 'selected';
    capacity.item(3).style = 'display: none';
  }

  var capacityValidate = function () {
    if (roomNumber.value === '1') {
      capacity.item(0).style = 'display: none';
      capacity.item(2).removeAttribute('style');
      capacity.item(2).selected = 'selected';
      capacity.item(1).style = 'display: none';
      capacity.item(3).style = 'display: none';
    } else if (roomNumber.value === '2') {
      capacity.item(1).removeAttribute('style');
      capacity.item(1).selected = 'selected';
      capacity.item(2).removeAttribute('style');
      capacity.item(0).style = 'display: none';
      capacity.item(3).style = 'display: none';
    } else if (roomNumber.value === '3') {
      capacity.item(0).removeAttribute('style');
      capacity.item(0).selected = 'selected';
      capacity.item(1).removeAttribute('style');
      capacity.item(2).removeAttribute('style');
      capacity.item(3).style = 'display: none';
    } else if (roomNumber.value === '100') {
      capacity.item(0).style = 'display: none';
      capacity.item(1).style = 'display: none';
      capacity.item(2).style = 'display: none';
      capacity.item(3).removeAttribute('style');
      capacity.item(3).selected = 'selected';
    }
  };

  var onChangeCapacity = function () {
    capacityValidate();
  };

  roomNumber.addEventListener('change', onChangeCapacity);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (form.checkValidity()) {
      window.requests.send(new FormData(form), window.onLoad, window.onError);
    }
  });

  window.enableControls = function (elements) {
    form.classList.remove('ad-form--disabled');

    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }

    for (var j = 0; j < elements.length; j++) {
      elements[j].removeAttribute('disabled');
    }
  };

  var typeValidate = function (evt) {
    if (evt.target.value === 'bungalo') {
      price.setAttribute('min', window.constants.BUNGALO_MIN_PRICE);
      price.setAttribute('placeholder', '0');
    } else if (evt.target.value === 'flat') {
      price.setAttribute('min', window.constants.FLAT_MIN_PRICE);
      price.setAttribute('placeholder', '1000');
    } else if (evt.target.value === 'house') {
      price.setAttribute('min', window.constants.HOUSE_MIN_PRICE);
      price.setAttribute('placeholder', '5000');
    } else if (evt.target.value === 'palace') {
      price.setAttribute('min', window.constants.PALACE_MIN_PRICE);
      price.setAttribute('placeholder', '10000');
    }
  };

  var onChangeType = function (evt) {
    typeValidate(evt);
  };

  type.addEventListener('change', onChangeType);

  selectTime.addEventListener('change', function (evt) {
    var index = evt.target.selectedIndex;
    var options = evt.target.querySelectorAll('option');

    if (evt.target === timeIn) {
      options = timeOut.querySelectorAll('option');
    }

    if (evt.target === timeOut) {
      options = timeIn.querySelectorAll('option');
    }

    for (var i = 0; i < options.length; i++) {
      options[i].removeAttribute('selected');

      if (index === i) {
        options[i].selected = true;
      }
    }
  });

  window.setAdress = function (x, y) {
    address.setAttribute('value', (x + (Math.floor(window.constants.MAP_PIN_WIDTH / 2)) + ', ' + (y + window.constants.MAP_PIN_HEIGHT)));
  };

  var onClickResetButton = function () {
    window.resetForm();
  };

  resetFormButton.addEventListener('click', onClickResetButton);

  window.disableControls();
})();
