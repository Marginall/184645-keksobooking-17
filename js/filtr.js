'use strict';

(function () {
  var filter = document.querySelector('.map__filters');
  var housingType = filter.querySelector('#housing-type');
  window.sort = false;

  var filterSort = function (arr, value) {
    var sortFilter = arr.filter(function (item) {
      if (value === 'any') {
        return item;
      } else {
        return item.offer.type === value;
      }
    });

    window.sort = true;
    window.pinGenerate(sortFilter);
    window.offerGenerate(sortFilter);
  };

  filter.addEventListener('change', function (evt) {
    if (evt.target === housingType) {
      filterSort(window.items, evt.target.value);
    }
  });
})();
