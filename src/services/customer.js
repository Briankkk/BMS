import { stringify } from 'qs';
import request from '../utils/request';

/*export async function query(params) {
  return request(`/customer?${stringify(params)}`);
}*/

export async function query() {
  return request('/customer');
}

export async function add(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function mod(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function del(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}


