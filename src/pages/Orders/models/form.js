import { routerRedux } from 'dva/router';
import { fakeSubmitForm } from '@/services/api';

export default {
  namespace: 'form',

  state: {
    user: {
      username: 'ant-design@alipay.com',
      token: 'test@example.com',
    },
  },

  effects: {
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/order/result'));
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
  },
};
