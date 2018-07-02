import { routerRedux } from 'dva/router';
import { query,queryById,add,mod,del } from '../services/purchase';
import { queryAll as querySupplierList } from '../services/supplier';
import { queryAll as queryMaterList } from '../services/mater';
import {generatePDF,printPDF} from '../services/importExport';
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


    *delete({ payload = {} }, { call, put }) {
      const res = yield call(del, payload.id);
      if (res.code === 0) {
        message.success('删除采购单成功');
        yield put({
          type: 'query',
        });
      }
      else {
        message.error(res.message);
      }
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


  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },
};
