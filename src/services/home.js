import { stringify } from 'qs';
import request from '../utils/request';

export async function login(params) {
  return request('/login', {
    method: 'POST',
    body: params,
  });
}

export async function logout() {
  return request('/logout', {
    method: 'POST'
  });
}

export async function queryCurrent() {
  return request('/currentUser');
}
