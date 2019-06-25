'use strict';

(function () {
  var POINTS_LENGTH = 8;
  var MAX_WIDTH = 1200;
  var MIN_WIDTH = 1;
  var MAX_HEIGHT = 630;
  var MIN_HEIGHT = 130;

  window.pointsGenerate = function (items) {
    for (var i = 1; i <= POINTS_LENGTH; i++) {
      var item = {
        author: {
          avatar: 'img/avatars/user0' + i + '.png'
        },
        offer: {
          type: ['palace', 'flat', 'house', 'bungalo']
        },
        location: {
          x: Math.floor(Math.random() * (MAX_WIDTH - MIN_WIDTH)) + MIN_WIDTH,
          y: Math.floor(Math.random() * (MAX_HEIGHT - MIN_HEIGHT)) + MIN_HEIGHT
        }
      };
      items.push(item);
    }
  };
})();
