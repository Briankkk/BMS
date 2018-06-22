import {message} from 'antd';

export default {
  namespace: 'home',

  state: {

  },

  effects: {
    *query({ payload = {} }, { call, put }) {

    },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },
};
