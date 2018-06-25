import { stringify } from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/prod?${stringify(params)}`);
}

export async function queryById(id) {
  return request('/prod/'+id);
}

export async function add(params) {
  return request('/prod', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function mod(params) {
  return request('/prod/'+params.PROD_ID, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function del(id) {
  return request('/prod/'+id, {
    method: 'DELETE',
  });
}


