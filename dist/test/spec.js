'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _ = require('../');

var _2 = _interopRequireDefault(_);

var limit = 3;
var list = [1, 2, 3, 4, 5];
var fulfilled = list.map(function (item) {
  item;
});
var success = function success(item, resolve, reject) {
  return resolve({ item: item });
};
var failure = function failure(item, resolve, reject) {
  if (item === 4) reject(new Error(item));else resolve({ item: item });
};

describe('all-limit', function () {

  it('should be a Promise', function () {
    _2['default'].should.be.a.Promise;
  });

  it('should complete successfully', function (done) {
    (0, _2['default'])({ limit: limit, list: list, promise: success }).then(function (results) {
      results.should.be.an.Array['with'].length(5);
      results[0].should.be.an.Object['with'].property('item');
      results[0].item.should.eql(1);
      results[3].item.should.eql(4);
    }).then(done)['catch'](done);
  });

  it('should fail', function (done) {
    (0, _2['default'])({ limit: limit, list: list, proimse: failure }).then(done)['catch'](function (err) {
      err.should.be.an.Error;
      done();
    });
  });
});