import {
  SUBMIT_INCOME
} from './../actions/types';

import { REHYDRATE } from 'redux-persist/constants';

const INITIAL_STATE = { incomeObject: [] }

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SUBMIT_INCOME:
      return { incomeObject: [ ...state.incomeObject, action.payload ] }
    case REHYDRATE:
      var incoming = action.payload.income;
      if (incoming) {
        return { ...state, ...incoming }
      } else {
        return state;
      }
    default:
      return state;
  }
}