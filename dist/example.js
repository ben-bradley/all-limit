'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ = require('./');

var _2 = _interopRequireDefault(_);

(0, _2['default'])({
  limit: 3,
  list: [1, 2, 3, 4, 5, 6, 7, 8],
  promise: function promise(item, resolve, reject) {
    setTimeout(function () {
      return resolve('item: ' + item);
    }, 1000);
  }
}).then(function (results) {
  return console.log('all done:', results);
})['catch'](function (err) {
  return console.log('error:', err);
});