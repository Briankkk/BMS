import { query,approve,reject} from '../services/authRequest';
import {pageInfo} from '../constants/constants'
import {message} from 'antd';

export default {
  namespace: 'authRequest',

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

    *approve({ payload = {} }, { call, put }) {
      const res = yield call(approve, payload.id);
      if (res.code === 0) {
        message.success('成功同意登录请求');
        yield put({
          type: 'query',
        });
      }
      else {
        message.error('审批请求失败');
      }
    },

    *reject({ payload = {} }, { call, put }) {
      const res = yield call(reject, payload.id);
      if (res.code === 0) {
        message.success('成功拒绝登录请求');
        yield put({
          type: 'query',
        });
      }
      else {
        message.error('审批请求失败');
      }
    },


  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },
};
