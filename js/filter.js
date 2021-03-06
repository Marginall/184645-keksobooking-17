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
      price: price.value === 'any' ? true : false,
      rooms: rooms.value === 'any' ? true : parseInt(rooms.value, 10),
      guests: guests.value === 'any' ? true : parseInt(guests.value, 10),
      features: filterFeature()
    };

    arr.forEach(function (item) {
      var params = {
        type: item.offer.type === window.sort.type || window.sort.type === true,
        price: window.sort.price === false ? filterPrice(item, price.value) : true,
        rooms: item.offer.rooms === window.sort.rooms || window.sort.rooms === true,
        guests: item.offer.guests === window.sort.guests || window.sort.guests === true,
        features: true
      };
      filterFeatures(item, params);

      if (params.type && params.price && params.rooms && params.guests && params.features) {
        sortItems.push(item);
      }
    });

    if (window.popupShow) {
      window.closePopup();
    }

    window.pinGenerate(sortItems);
  };

  var filterPrice = function (item, value) {
    var itemPrice = item.offer.price;
    if (value === 'high') {
      return itemPrice > window.constants.HIGH_PRICE;
    } else if (value === 'low') {
      return itemPrice < window.constants.LOW_PRICE;
    } else if (value === 'middle') {
      return itemPrice > window.constants.LOW_PRICE && itemPrice < window.constants.HIGH_PRICE;
    }
    return false;
  };

  var filterFeatures = function (item, params) {
    window.sort.features.forEach(function (feature) {
      if (item.offer.features.indexOf(feature)) {
        params.features = false;
      } else {
        params.features = true;
      }
    });
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
    window.debounce(function () {
      filterSort(window.items);
    });
  });
})();
