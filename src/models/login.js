import { routerRedux } from 'dva/router';
import { login,logout } from '../services/home';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: '',
  },

  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(login, payload);
      if (res.code === -1) {
        yield put({
          type: 'changeLoginStatus',
          payload: {status:'error'},
        });
      }
      else if (res.code === 0) {
        yield  put({type: 'changeLoginStatus', payload: {status: 'success',currentAuthority:res.data.STAFF_ROLE}});
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    },
    *logout(_, { call,put, select }) {
      try {
        yield call(logout);
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: '',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
