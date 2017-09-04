'use strict';

import config from '../config';

export function fetch_filtered_data(data) {
  return fetch(config.app_server, {dody: data});
};