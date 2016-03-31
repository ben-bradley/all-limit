# all-limit

Like `Promise.all()`, but with a concurrency limiter.

## About

`Promise.all()` is great, but sometimes, you want to throttle the number of concurrent executions.

That's where `all-limit` shines.

## Example

```javascript
'use strict';

import all from 'all-limit';

all({
  limit: 3,
  list: [ 1, 2, 3, 4, 5, 6, 7, 8 ],
  promise(item, resolve, reject) {
    // item is a .shift()ed element of the list[]
    setTimeout(() => resolve('item: ' + item), 1000);
  }
})
  .then((results) => console.log('all done:', results))
  .catch((err) => console.log('error:', err));
```

## `all({ limit, list, promise })`

- `limit` - __Number__, the concurrency limiter.
- `list` - __Array__, each element of the `list` is provided to the `promise` function.
- `promise` - __Function__, `(item, resolve, reject)`, `item` is an element of the `list` array.  The `resolve` and `reject` arguments are standard `Promise` callbacks.

## Versions

- 0.0.1 - Initial release
