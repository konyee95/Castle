import firebase from 'firebase';
import {
  LISTEN_TO_USER,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  AUTH_FAIL,
  CLEAR_ERROR_MESSAGE,
  LOGOUT_USER,
  SET_PASSCODE,
  REMOVE_PASSCODE,
  CHECK_USERNAME
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

const dispatchUsernameMessage = (dispatch, message) => {
  dispatch({
    type: CHECK_USERNAME,
    payload: message
  });
};

export function clearErrorMessage() {
  return {
    type: CLEAR_ERROR_MESSAGE,
    payload: null
  };
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

export function removePasscode() {
  return {
    type: REMOVE_PASSCODE
  };
};

export function checkUserName(username) {
  return(dispatch) => {
    firebase.database().ref(`/ExistingUser/`)
      .once('value', snapshot =>{
        console.log(snapshot.val())
        if(snapshot.hasChild(username)) {
          dispatchUsernameMessage(dispatch, 'Username is taken')
        } else {
          dispatchUsernameMessage(dispatch, 'Username is available')
        }
      });
  };
};