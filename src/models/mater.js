import { query,queryById,add,mod,del } from '../services/mater';
import { query as queryMaterTypeList } from '../services/materType';
import {exportFile} from '../services/importExport';
import {pageInfo} from '../constants/constants'
import {message} from 'antd';

export default {
  namespace: 'mater',

  state: {
    list: [],
    total: 0,
    materTypeList:[],
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

        yield put({
          type: 'queryMaterTypeList',
          payload: {},
        });
      }
    },

    *queryMaterTypeList({ payload = {} }, { call, put }) {
      const res = yield call(queryMaterTypeList);
      if (res.code === 0) {
        yield put({
          type: 'save',
          payload: {materTypeList: res.data},
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
        message.success('新增原料成功');
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
        message.success('修改原料成功');
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
        message.success('删除原料成功');
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
