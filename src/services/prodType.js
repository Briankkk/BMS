import { stringify } from 'qs';
import request from '../utils/request';

export async function query() {
  return request(`/prodType`);
}
