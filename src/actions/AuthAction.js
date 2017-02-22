import firebase from 'firebase';
import {
  LISTEN_TO_USER,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  AUTH_FAIL,
  LOGOUT_USER,
  SET_PASSCODE
} from './types';

const registerUserSuccess = (dispatch, user) => {
  dispatch({
    type: REGISTER_USER_SUCCESS,
    payload: user
  });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};

const authFail = (dispatch, error) => {
  dispatch({
    type: AUTH_FAIL,
    payload: {
      error: error.message
    }
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
      .catch(error => authFail(dispatch, error));
  };
} ;

export function loginUser(email, password) {
  return(dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(error => authFail(dispatch, error));
  };
};

export function logoutUser() {
  firebase.auth().signOut();
  return {
    type: LOGOUT_USER
  };
};

export function setPasscode(passcode) {
  return {
    type: SET_PASSCODE,
    payload: passcode
  };
};
