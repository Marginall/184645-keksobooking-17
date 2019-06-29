'use strict';

(function () {
  var filter = document.querySelector('.map__filters');
  var housingType = filter.querySelector('#housing-type');
  window.sort = false;

  var filterSort = function (arr, value) {
    var items = arr.map(function (items, index, arr) {
      return items;
    });

    var sortFilter = items.filter(function (item) {
      if (value === 'any') {
        return item;
      } else {
        return item.offer.type === value;
      }
    });

    window.sort = true;
    window.pinGenerate(sortFilter);
  };

  filter.addEventListener('change', function (evt) {
    if (evt.target === housingType) {
      filterSort(window.items, evt.target.value);
    }
  });
})();
