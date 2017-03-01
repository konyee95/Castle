import {
  GET_USER_PROFILE
} from './../actions/types';

import { REHYDRATE } from 'redux-persist/constants'

const INITIAL_STATE = { username: '', email: '', firstName: '', lastName: '', };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return { ...state,
        username: action.payload.username,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName
      }
    case REHYDRATE:
      var incoming = action.payload.profile;
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