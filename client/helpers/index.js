'use strict';

import fetch from 'isomorphic-fetch';

export function fetch_filtered_data(url, method, data) {
  let options = null;

  switch (method) {
    case 'get':
      options = {method};
      break;

    case 'post':
      options = {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method
      };
      break;
  }

  return fetch(url, options)
    .then(data => data.json())
    .catch(err => console.log(err));
};

export function min_max_validation(value, min, max) {
  return value < min || value > max;
}