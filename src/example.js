'use strict';

import all from './';

all({
  limit: 3,
  list: [ 1, 2, 3, 4, 5, 6, 7, 8 ],
  promise(item, resolve, reject) {
    setTimeout(() => resolve('item: ' + item), 1000);
  }
})
  .then((results) => console.log('all done:', results))
  .catch((err) => console.log('error:', err));
