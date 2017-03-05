import {
  SUBMIT_EXPENSES,
  DELETE_EXPENSES,
} from './../actions/types';

import { REHYDRATE } from 'redux-persist/constants';

const INITIAL_STATE = { expensesObject: [] }

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SUBMIT_EXPENSES:
      return { expensesObject: [ ...state.expensesObject, action.payload ] }
    case DELETE_EXPENSES:
      const expenseID = action.payload.expenseID;
      return { expensesObject: state.expensesObject.filter(expensesObject => expensesObject.expenseID !== expenseID) }
    case REHYDRATE:
      var incoming = action.payload.expenses;
      if (incoming) {
        return { ...state, ...incoming }
      } else {
        return state;
      }
    default:
      return state;
  }
}