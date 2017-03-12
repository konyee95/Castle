import {
  SUBMIT_EXPENSES,
  SUBMIT_VOICE_EXPENSE,
  GREET_USER,
  CLEAR_VOICE_MESSAGE,
  TRY_AGAIN,
  DELETE_EXPENSES,
} from './../actions/types';

import { REHYDRATE } from 'redux-persist/constants';

const INITIAL_STATE = { expensesObject: [], voiceMessage: null }

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SUBMIT_EXPENSES:
      return { expensesObject: [ ...state.expensesObject, action.payload ] }
    case SUBMIT_VOICE_EXPENSE: 
      return { expensesObject: [ ...state.expensesObject, action.payload.expensesObject ] , voiceMessage: action.payload.voiceMessage }
    case GREET_USER: 
      return { ...state, voiceMessage: action.payload }
    case TRY_AGAIN:
      return { ...state, voiceMessage: action.payload }
    case CLEAR_VOICE_MESSAGE:
      return { ...state, voiceMessage: action.payload }
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