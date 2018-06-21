import { stringify } from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/handlerLog?${stringify(params)}`);
}

export async function queryById(id) {
  return request('/handlerLog/'+id);
}




