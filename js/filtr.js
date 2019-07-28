'use strict';

(function () {
  var filter = document.querySelector('.map__filters');
  var type = filter.querySelector('#housing-type');
  var price = filter.querySelector('#housing-price');
  var rooms = filter.querySelector('#housing-rooms');
  var guests = filter.querySelector('#housing-guests');
  window.sort = {};

  var filterSort = function (arr) {
    var sortItems = [];

    window.sort = {
      type: type.value === 'any' ? true : type.value,
      price: price.value === 'any' ? window.sort.price = true : filterPrice(price , price.value),
      rooms: rooms.value === 'any' ? true : parseInt(rooms.value),
      guests: guests.value === 'any' ? true : parseInt(guests.value),
      features: filterFeature()
    };

    arr.forEach(function (item) {
      var params = {
        type: item.offer.type === window.sort.type || window.sort.type === true,
        rooms: item.offer.rooms === window.sort.rooms || window.sort.rooms === true,
        guests: item.offer.guests === window.sort.guests || window.sort.guests === true,
        features : true
      };
      filterFeatures(item, params);

      if (params.type && params.rooms && params.guests && params.features) {
        sortItems.push(item);
      }
    });

    console.log(sortItems);
    window.pinGenerate(sortItems);
  };

  var filterFeatures = function (item, params) {
    window.sort.features.forEach(function (feature, i) {
      if (item.offer.features.indexOf(feature)) {
        params.features = false;
      } else {
        params.features = true;
      }
    });
  };

  var filterPrice = function (item, value) {
    switch (value) {
      case 'middle':
        item.value > 10000 && item.value < 50000;
      case 'low':
        return item.offer.price < 10000;
      case 'high':
        return item.offer.price > 50000;
      default:
        throw new Error('Неизвестный тип');
    }
  };

  var filterFeature = function () {
    var features = filter.querySelectorAll('#housing-features input:checked');
    var featuresList = [];
    if (features.length) {
      features.forEach(function (item) {
        featuresList.push(item.value);
      });
    }
    return featuresList;
  };

  filter.addEventListener('change', function () {
    filterSort(window.items);
  });
})();
