import firebase from 'firebase';
import {
  SUBMIT_INCOME,
} from './types';

export function submitIncome(incomeObject) {
  const { currentUser } = firebase.auth();
  return(dispatch) => {
    dispatch({
      type: SUBMIT_INCOME,
      payload: incomeObject
    });
  };
};