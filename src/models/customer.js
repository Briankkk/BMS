import { query,queryById,add,mod,del } from '../services/customer';
import {exportFile,generatePDF,printPDF} from '../services/importExport';
import {pageInfo} from '../constants/constants'
import {message} from 'antd';

export default {
  namespace: 'customer',

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

    *generatePDF({ payload = {} }, { call, put }) {
      const res = yield call(generatePDF, {...payload});
      if (res.code === 0) {
        yield put({
          type: 'printPDF',
          payload: {fileName: res.data},
        });

      }
    },


    *printPDF({ payload = {} }, { call, put }) {
        yield call(printPDF, {...payload});
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
        message.error(res.message);
      }
    },

    *modify({ payload = {} }, { call, put }) {
      const res = yield call(mod, payload);
      if (res.code === 0) {
        message.success('修改客户成功');
        yield put({
          type: 'query',
        });
      }
      else {
        message.error(res.message);
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
        message.error(res.message);
      }
    },


  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },
};
