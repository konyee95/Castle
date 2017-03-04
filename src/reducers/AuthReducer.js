import { Actions } from 'react-native-router-flux';

import {
  LISTEN_TO_USER,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  AUTH_FAIL,
  CLEAR_ERROR_MESSAGE,
  LOGOUT_USER,
  SET_PASSCODE,
  REMOVE_PASSCODE,
  CHECK_USERNAME,
  CREATE_USER_REF
} from './../actions/types';

import { REHYDRATE } from 'redux-persist/constants'

const INITIAL_STATE = { user: null, error: null, passcode: null, message: null };
const EXIST_STATE = { user: {}, error: null, passcode: null, message: null };

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case LISTEN_TO_USER:
      if (!action.payload) {
        return EXIST_STATE;
      }
      return {
        ...state, //persist passcode
        user: {
          email: action.payload.email,
          uid: action.payload.uid
        },
        error: null,
      };
    case REGISTER_USER_SUCCESS:
      return EXIST_STATE;
    case LOGIN_USER_SUCCESS:
      return {
        user: {
          email: action.payload.email,
          uid: action.payload.uid
        },
        error: null,
        passcode: null
      };
    case AUTH_FAIL:
      return { ...state, error: action.payload.error }
    case CLEAR_ERROR_MESSAGE:
      return { ...state, error: action.payload, message: action.payload };
    case LOGOUT_USER:
      return INITIAL_STATE;
    case SET_PASSCODE:
      return { ...state, passcode: action.payload }
    case REMOVE_PASSCODE:
      return { ...state, passcode: null }
    case CHECK_USERNAME: 
      return { ...state, message: action.payload } 
    case CREATE_USER_REF:
      return { ...state, message: action.payload }
    case REHYDRATE:
      var incoming = action.payload.auth;
      if (incoming) {
        return { ...state, ...incoming }
      } else {
        return state;
      }
    default:
      return state;
  }
}
