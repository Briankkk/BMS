import { query,add,mod,del } from '../services/customer';
import {pageInfo} from '../constants/constants'
export default {
  namespace: 'customer',

  state: {
    list: [],
    pagination: pageInfo,

  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const res = yield call(query, payload);
      if (res.code === 0) {
        yield put({
          type: 'save',
          payload: {list: res.data},
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },
};
