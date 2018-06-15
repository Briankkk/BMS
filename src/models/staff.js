import { query,queryById,add,mod,del } from '../services/staff';
import { query as queryRoleList } from '../services/role';
import {pageInfo} from '../constants/constants'
import {message} from 'antd';

export default {
  namespace: 'staff',

  state: {
    list: [],
    total: 0,
    roleList:[],
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
          type: 'queryRoleList',
          payload: {},
        });
      }
    },

    *queryRoleList({ payload = {} }, { call, put }) {
      const res = yield call(queryRoleList);
      if (res.code === 0) {
        yield put({
          type: 'save',
          payload: {roleList: res.data},
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
        message.success('新增员工成功');
        yield put({
          type: 'query',
        });
      }
      else {
        message.error('新增员工失败');
      }
    },

    *modify({ payload = {} }, { call, put }) {
      const res = yield call(mod, payload);
      if (res.code === 0) {
        message.success('修改员工成功');
        yield put({
          type: 'query',
        });
      }
      else {
        message.error('修改员工失败');
      }
    },

    *delete({ payload = {} }, { call, put }) {
      const res = yield call(del, payload.id);
      if (res.code === 0) {
        message.success('删除员工成功');
        yield put({
          type: 'query',
        });
      }
      else {
        message.error('删除员工失败');
      }
    },


  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },
};
