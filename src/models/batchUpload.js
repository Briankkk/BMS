import { routerRedux } from 'dva/router';
import {importFile} from '../services/importExport';
import {message} from 'antd';


export default {
  namespace: 'batchUpload',
  state: {},

  effects: {
    *importFile({ payload = {} }, { select,call, put }) {
      const res = yield call(importFile, payload);
      if (res.code === 0) {
        message.success('导入成功');

        const fileType = payload.fileType;
        switch (fileType) {
          case 'CUSTOMER':
            yield put(routerRedux.push('/management/customer'));
            break;
          case 'SUPPLIER':
            yield put(routerRedux.push('/management/supplier'));
            break;
        }

      }
      else {
        message.error('导入失败');
      }
    },

  },

  reducers: {},
};
