'use strict';

import config from '../config';

export function fetch_filtered_data(data) {
  return fetch(`http://${config.app_server.ip}:${config.app_server.port}/data`, {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post'
  })
    .then(data => data.json())
    .catch(err => console.log(err));
};