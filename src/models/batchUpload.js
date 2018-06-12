import { routerRedux } from 'dva/router';
import {importFile} from '../services/importExport';
import {message} from 'antd';


export default {
  namespace: 'batchUpload',
  state: {
  },

  effects: {
    *importFile({ payload = {} }, { call, put }) {
      const res = yield call(importFile, payload);
      if (res.code === 0) {
        message.success('导入客户成功');
        yield put(routerRedux.push('/management/customer'));
      }
      else {
        message.error('导入客户失败');
      }
    },

  },

  reducers: {
  },
};
