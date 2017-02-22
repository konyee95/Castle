import { Actions } from 'react-native-router-flux';

import {
  LISTEN_TO_USER,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  AUTH_FAIL,
  LOGOUT_USER
} from './../actions/types';

import { REHYDRATE } from 'redux-persist/constants'

const INITIAL_STATE = { user: null, error: null };
const EXIST_STATE = { user: {}, error: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LISTEN_TO_USER:
      if (!action.payload) {
        return EXIST_STATE;
      }
      return {
        user: {
          email: action.payload.email,
          uid: action.payload.uid
        },
        error: null
      };
    case REGISTER_USER_SUCCESS:
      return EXIST_STATE;
    case LOGIN_USER_SUCCESS:
      return {
        user: {
          email: action.payload.email,
          uid: action.payload.uid
        },
        error: null
      };
    case AUTH_FAIL:
      return {
        error: action.payload.error
      }
    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
}
