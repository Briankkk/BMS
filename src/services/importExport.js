import { stringify } from 'qs';
import request from '../utils/request';

export async function exportFile(params) {
  window.open(`/exportFile?${stringify(params)}`)
}

export async function generatePDF(params) {
  return request(`/generatePDF?${stringify(params)}`);
}

export async function printPDF(params) {
  window.setTimeout(function(){ window.open(`/printPDF?${stringify(params)}`); }, 1000);
}

export async function importFile(params) {
  return request('/importFile', {
    method: 'POST',
    body: {
      ...params,
    },
  });

}






