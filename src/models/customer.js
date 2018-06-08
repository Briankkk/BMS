import { query,queryById,add,mod,del } from '../services/customer';
import {pageInfo} from '../constants/constants'
import {message} from 'antd';

export default {
  namespace: 'customer',

  state: {
    list: [],
    pagination: pageInfo,
    customer:{},
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

    *queryById({ payload = {} }, { call, put }) {
      const res = yield call(queryById, payload.id);
      if (res.code === 0) {
        yield put({
          type: 'save',
          payload: {list: res.data},
        });
      }
    },



    *add({ payload = {} }, { call, put }) {
      const res = yield call(add, payload);
      if (res.code === 0) {
        message.success('新增客户成功');
        yield put({
          type: 'query',
        });
      }
      else {
        message.error('新增客户失败');
      }
    },

    *modify({ payload = {} }, { call, put }) {
      console.log(payload)
      const res = yield call(mod, payload);
      if (res.code === 0) {
        message.success('修改客户成功');
        yield put({
          type: 'query',
        });
      }
      else {
        message.error('修改客户失败');
      }
    },

    *delete({ payload = {} }, { call, put }) {
      const res = yield call(del, payload.id);
      if (res.code === 0) {
        message.success('删除客户成功');
        yield put({
          type: 'query',
        });
      }
      else {
        message.error('删除客户失败');
      }
    },


  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },
};
