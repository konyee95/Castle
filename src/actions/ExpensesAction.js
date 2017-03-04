import {
  SUBMIT_EXPENSES,
} from './types';

export function submitExpenses(expensesObject) {
  return(dispatch) => {
    dispatch({
      type: SUBMIT_EXPENSES,
      payload: expensesObject
    })
  }
}