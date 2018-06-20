import { stringify } from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/cust?${stringify(params)}`);
}

export async function queryById(id) {
  return request('/cust/'+id);
}

export async function add(params) {
  return request('/cust', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function mod(params) {
  return request('/cust/'+params.CUST_ID, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function del(id) {
  return request('/cust/'+id, {
    method: 'DELETE',
  });
}


