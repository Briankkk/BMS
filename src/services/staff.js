import { stringify } from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/staff?${stringify(params)}`);
}

export async function queryById(id) {
  return request('/staff/'+id);
}

export async function add(params) {
  return request('/staff', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function mod(params) {
  return request('/staff/'+params.STAFF_ID, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function del(id) {
  return request('/staff/'+id, {
    method: 'DELETE',
  });
}


