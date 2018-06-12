import { stringify } from 'qs';

export async function exportFile(params) {
  window.open(`/exportFile?${stringify(params)}`)
}




