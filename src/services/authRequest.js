import { stringify } from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/authRequest?${stringify(params)}`);
}


export async function approve(id) {
  return request('/authRequest/approve/'+id, {
    method: 'PUT',
  });
}

export async function reject(id) {
  return request('/authRequest/reject/'+id, {
    method: 'PUT',
  });
}


