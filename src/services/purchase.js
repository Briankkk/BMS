import { stringify } from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/purchase?${stringify(params)}`);
}


export async function queryById(id) {
  return request('/purchase/'+id);
}

export async function add(params) {
  return request('/purchase', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function mod(params) {
  return request('/purchase/'+params.PURCHASE_ID, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function del(id) {
  return request('/purchase/'+id, {
    method: 'DELETE',
  });
}


