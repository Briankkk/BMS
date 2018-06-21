import { query,queryById} from '../services/handlerLog';
import {pageInfo} from '../constants/constants'
import {message} from 'antd';

export default {
  namespace: 'handlerLog',

  state: {
    list: [],
    total: 0,
    pagination: {...pageInfo},
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const res = yield call(query, {...pageInfo, ...payload});
      if (res.code === 0) {
        yield put({
          type: 'save',
          payload: {list: res.data.list, total: res.data.total},
        });
      }
    },



    *queryById({ payload = {} }, { call, put }) {
      const res = yield call(queryById, payload.id);
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
