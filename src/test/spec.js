'use strict';

import should from 'should';

import all from '../';

const limit = 3;
const list = [ 1, 2, 3, 4, 5 ];
const fulfilled = list.map((item) => { item });
const success = (item, resolve, reject) => resolve({ item });
const failure = (item, resolve, reject) => {
  if (item === 4)
    reject(new Error(item));
  else
    resolve({ item });
};

describe('all-limit', () => {

  it('should be a Promise', () => {
    (all).should.be.a.Promise;
  });

  it('should complete successfully', (done) => {
    all({ limit, list, promise: success })
      .then((results) => {
        (results).should.be.an.Array.with.length(5);
        (results[0]).should.be.an.Object.with.property('item');
        (results[0].item).should.eql(1);
        (results[3].item).should.eql(4);
      })
      .then(done)
      .catch(done);
  });

  it('should fail', (done) => {
    all({ limit, list, proimse: failure })
      .then(done)
      .catch((err) => {
        (err).should.be.an.Error;
        done();
      })
  });

});
