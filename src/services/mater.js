import { stringify } from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/mater?${stringify(params)}`);
}

export async function queryById(id) {
  return request('/mater/'+id);
}

export async function add(params) {
  return request('/mater', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function mod(params) {
  return request('/mater/'+params.MATER_ID, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function del(id) {
  return request('/mater/'+id, {
    method: 'DELETE',
  });
}


