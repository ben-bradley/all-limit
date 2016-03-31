'use strict';

const all = ({ limit, list, promise }) => {
  return new Promise((resolve, reject) => {
    if (!limit || typeof limit !== 'number')
      return reject(new Error('limit must be a number'));

    if (!list || !Array.isArray(list))
      return reject(new Error('list must be an array'));

    if (!promise || typeof promise !== 'function')
      return reject(new Error('promise must be a function'));

    let started = 0,
      completed = 0,
      max = list.length,
      results = [];

    let execute = () =>
      new Promise((_resolve, _reject) =>
        promise(list.shift(), _resolve, _reject))
      .then((result) => next(null, result))
      .catch((err) => next(err));

    let next = (err, result) => {
      completed += 1;

      if (result)
        results.push(result);

      if (err)
        reject(err);
      else if (completed === max)
        resolve(results);
      else if (list.length)
        execute();
    };

    while (started++ < limit)
      execute();

  });
};

export default all;
