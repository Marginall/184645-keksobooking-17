'use strict';

(function () {
  var filter = document.querySelector('.map__filters');
  var housingType = filter.querySelector('#housing-type');
  window.sort = false;

  var filterSort = function (value) {

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
      filterSort(evt.target.value);
    }
  });
})();
