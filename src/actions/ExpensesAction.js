import firebase from 'firebase';
import {
  SUBMIT_EXPENSES,
  SUBMIT_INCOME,
  DELETE_EXPENSES,
} from './types';

const updateExpenses = (dispatch, expensesObject) => {
  dispatch({
    type: SUBMIT_EXPENSES,
    payload: expensesObject
  });
};

const updateIncome = (dispatch, incomeObject) => {
  dispatch({
    type: SUBMIT_INCOME,
    payload: incomeObject
  });
};

export function submitExpenses(expensesObject) {
  const { currentUser } = firebase.auth();
  const { expenseID, amount, category, exactDate, date, time, note } = expensesObject;
  return(dispatch) => {
    updateExpenses(dispatch, expensesObject);
    firebase.database().ref(`/Expenses/${expenseID}`).set({
      ownerID: currentUser.uid,
      expenseID: expenseID,
      amount: amount,
      category: category,
      exactDate: exactDate,
      date: date,
      time: time,
      note: note
    }).then(() => console.log('Pushed to database'))
      .catch((error) => console.log(error))
  }
}

export function submitIncome(incomeObject) {
  const { currentUser } = firebase.auth();
  return(dispatch) => {
    
  }
}

export function deleteExpensesItem(expensesObject) {
  return(dispatch) => {
    dispatch({
      type: DELETE_EXPENSES,
      payload: expensesObject
    })
  }
}