import { routerRedux } from 'dva/router';
import { query,queryById,add,mod,del } from '../services/purchase';
import { queryAll as querySupplierList } from '../services/supplier';
import { queryAll as queryMaterList } from '../services/mater';
import {exportFile} from '../services/importExport';
import {pageInfo} from '../constants/constants'
import {message} from 'antd';

export default {
  namespace: 'purchase',

  state: {
    list: [],
    total: 0,
    supplierList: [],
    materList:[],
    pagination: {...pageInfo},
    editType: '',
    purchaseInfo:{}
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const res = yield call(query, {...pageInfo, ...payload});
      if (res.code === 0) {
        yield put({
          type: 'save',
          payload: {list: res.data.list, total: res.data.total,editType:''},
        });

        yield put({
          type: 'querySupplierList',
          payload: {},
        });

        yield put({
          type: 'queryMaterList',
          payload: {},
        });


      }
    },


    *querySupplierList({ payload = {} }, { call, put }) {
      const res = yield call(querySupplierList);
      if (res.code === 0) {
        yield put({
          type: 'save',
          payload: {supplierList: res.data},
        });
      }
    },

    *queryMaterList({ payload = {} }, { call, put }) {
      const res = yield call(queryMaterList);
      if (res.code === 0) {
        yield put({
          type: 'save',
          payload: {materList: res.data},
        });
      }
    },




    *exportFile({ payload = {} }, { call, put }) {
      yield call(exportFile, {...payload});
    },


    *queryById({ payload = {} }, { call, put }) {
      const res = yield call(queryById, payload.purchaseId);
      if (res.code === 0) {
        yield put({
          type: 'save',
          payload: {purchaseInfo: res.data,editType:payload.editType},
        });
      }
    },


    *add({ payload = {} }, { call, put }) {

      console.log(payload);

      const res = yield call(add, payload);
      if (res.code === 0) {
        message.success('新增采购单成功');
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
