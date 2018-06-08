import { stringify } from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/customer?${stringify(params)}`);
}

export async function queryById(id) {
  return request('/customer/'+id);
}

export async function add(params) {
  return request('/customer', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function mod(params) {
  return request('/customer/'+params.CUSTOMER_ID, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function del(id) {
  return request('/customer/'+id, {
    method: 'DELETE',
  });
}


