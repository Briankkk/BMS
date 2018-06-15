import { stringify } from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/supplier?${stringify(params)}`);
}

export async function queryById(id) {
  return request('/supplier/'+id);
}

export async function add(params) {
  return request('/supplier', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function mod(params) {
  return request('/supplier/'+params.SUPPLIER_ID, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function del(id) {
  return request('/supplier/'+id, {
    method: 'DELETE',
  });
}


