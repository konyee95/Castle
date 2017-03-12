import firebase from 'firebase';
import {
  SUBMIT_EXPENSES,
  SUBMIT_INCOME,
  DELETE_EXPENSES,
} from './types';

import Moment from 'moment';
import expensesType from './../data/ExpensesType'

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

export function deleteExpensesItem(expensesObject) {
  return(dispatch) => {
    dispatch({
      type: DELETE_EXPENSES,
      payload: expensesObject
    })
  }
}

export function fetchWit(options) {
  const { currentUser } = firebase.auth();
  return(dispatch) => {
    fetch(options.url, {
      method: 'POST',
      headers: options.headers
    }).then(res => res.json())
      .then(json => constructExpenseObject(json.entities))
      .then(expensesObject => {
        const { expenseID, amount, category, exactDate, date, time, note } = expensesObject;
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
      })
      .catch(error => console.log(error.json()))
  }
}

const constructExpenseObject = (object) => {
  let date = object.datetime[0].value;
  let selectedCategory = '';

  expensesType.forEach((item) => {
    if(item.category.toLowerCase() === object.category[0].value.toLowerCase()) {
      selectedCategory = item.categoryID
    }
  })

  var expensesObject = {
    expenseID: Math.round((Math.pow(36, 28 + 1) - Math.random() * Math.pow(36, 28))).toString(36).slice(1),
    amount: object.amount_of_money[0].value,
    category: selectedCategory,
    exactDate: date,
    date: Moment(date).format('YYYY-MM-DD'),
    time: Moment(date).format('HH:mm:ss'),
    note: 'Sample Note',
  }

  return expensesObject;
}