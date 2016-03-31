'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var all = function all(_ref) {
  var limit = _ref.limit;
  var list = _ref.list;
  var promise = _ref.promise;

  return new Promise(function (resolve, reject) {
    if (!limit || typeof limit !== 'number') return reject(new Error('limit must be a number'));

    if (!list || !Array.isArray(list)) return reject(new Error('list must be an array'));

    if (!promise || typeof promise !== 'function') return reject(new Error('promise must be a function'));

    var started = 0,
        completed = 0,
        max = list.length,
        results = [];

    var execute = function execute() {
      return new Promise(function (_resolve, _reject) {
        return promise(list.shift(), _resolve, _reject);
      }).then(function (result) {
        return next(null, result);
      })['catch'](function (err) {
        return next(err);
      });
    };

    var next = function next(err, result) {
      completed += 1;

      if (result) results.push(result);

      if (err) reject(err);else if (completed === max) resolve(results);else if (list.length) execute();
    };

    while (started++ < limit) execute();
  });
};

exports['default'] = all;
module.exports = exports['default'];