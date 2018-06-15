import { query,queryById,add,mod,del } from '../services/supplier';
import {exportFile,generatePDF,printPDF} from '../services/importExport';
import {pageInfo} from '../constants/constants'
import {message} from 'antd';

export default {
  namespace: 'supplier',

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

    *exportFile({ payload = {} }, { call, put }) {
      yield call(exportFile, {...payload});
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
        message.success('新增供应商成功');
        yield put({
          type: 'query',
        });
      }
      else {
        message.error('新增供应商失败');
      }
    },

    *modify({ payload = {} }, { call, put }) {
      const res = yield call(mod, payload);
      if (res.code === 0) {
        message.success('修改供应商成功');
        yield put({
          type: 'query',
        });
      }
      else {
        message.error('修改供应商失败');
      }
    },

    *delete({ payload = {} }, { call, put }) {
      const res = yield call(del, payload.id);
      if (res.code === 0) {
        message.success('删除供应商成功');
        yield put({
          type: 'query',
        });
      }
      else {
        message.error('删除供应商失败');
      }
    },


  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },
};
