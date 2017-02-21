import firebase from 'firebase';
import {
  LISTEN_TO_USER,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
} from './types';

const registerUserSuccess = (dispatch, user) => {
  dispatch({
    type: REGISTER_USER_SUCCESS,
    payload: user
  });
};

export function listenToUser() {
  return(dispatch) => {
    firebase.auth().onAuthStateChanged(user => {
      dispatch({
        type: LISTEN_TO_USER,
        payload: user
      });
    });
  };
};

export function registerUser(email, password) {
  return(dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        registerUserSuccess(dispatch, user)
      })
      .catch(error => console.log(error));
  };
} ;
