import firebase from 'firebase';
import {
  SUBMIT_EXPENSES,
} from './types';

const updateStore = (dispatch, expensesObject) => {
  dispatch({
    type: SUBMIT_EXPENSES,
    payload: expensesObject
  })
}

export function submitExpenses(expensesObject) {
  const { currentUser } = firebase.auth();
  const { expenseID, amount, category, exactDate, date, time, note } = expensesObject;
  return(dispatch) => {
    updateStore(dispatch, expensesObject);
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