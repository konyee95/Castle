import { Actions } from 'react-native-router-flux';

import {
  LISTEN_TO_USER,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  AUTH_FAIL,
  LOGOUT_USER,
  SET_PASSCODE
} from './../actions/types';

import { REHYDRATE } from 'redux-persist/constants'

const INITIAL_STATE = { user: null, error: null, passcode: null };
const EXIST_STATE = { user: {}, error: null, passcode: '' };

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
        passcode: ''
      };
    case AUTH_FAIL:
      return {
        error: action.payload.error
      }
    case LOGOUT_USER:
      return INITIAL_STATE;
    case SET_PASSCODE:
      return { ...state, passcode: action.payload }
    case REHYDRATE:
      var incoming = action.payload.auth;
      console.log(incoming);
      if (incoming) {
        return { ...state, ...incoming }
      } else {
        return state;
      }
    default:
      return state;
  }
}
