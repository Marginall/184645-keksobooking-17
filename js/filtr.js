'use strict';

(function () {
  var filter = document.querySelector('.map__filters');
  var type = filter.querySelector('#housing-type');
  var price = filter.querySelector('#housing-price');
  var rooms = filter.querySelector('#housing-rooms');
  var guests = filter.querySelector('#housing-guests');
  var sortData = null;
  window.sort = false;

  var filterSort = function (arr, value, param) {
    sortData = arr.filter(function (item) {
      if (value === 'any') {
        return item;
      } else {
        switch (param) {
          case 'type':
            return item.offer.type === value;
          case 'price':
            return filterPrice(item, value);
          case 'rooms':
            return item.offer.rooms === parseInt(value);
          case 'guests':
            console.log(value);
              return item.offer.guests === parseInt(value);
          default:
            throw new Error('Неизвестный тип');
        }
      }
    });

    var pinUpdate = function () {

    };

    window.sort ? pinUpdate(sortData) : window.pinGenerate(sortData);
    window.sort = true;
  };

  var filterPrice = function (item, value) {
    switch (value) {
      case 'middle':
        return item.offer.price > 10000 && item.offer.price < 50000;
      case 'low':
        return item.offer.price < 10000;
      case 'high':
        return item.offer.price > 50000;
      default:
        throw new Error('Неизвестный тип');
    }
  };

  filter.addEventListener('change', function (evt) {
    switch (evt.target) {
      case type:
        return window.sort ? filterSort(sortData, evt.target.value, 'type') : filterSort(window.items, evt.target.value, 'type');
      case price:
        return window.sort ? filterSort(sortData, evt.target.value, 'price') : filterSort(window.items, evt.target.value, 'price');
      case rooms:
        return window.sort ? filterSort(sortData, evt.target.value, 'rooms') : filterSort(window.items, evt.target.value, 'rooms');
      case guests:
        return window.sort ? filterSort(sortData, evt.target.value, 'guests') : filterSort(window.items, evt.target.value, 'guests');
      default:
        throw new Error('Неизвестный тип');
    }
  });
})();
