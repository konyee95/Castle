import {
  GET_USER_PROFILE
} from './../actions/types';

import { REHYDRATE } from 'redux-persist/constants'

const INITIAL_STATE = { username: '', firstName: '', lastName: '', };

export default (state = INITIAL_STATE, action) => {
  console.log(action)
  switch (action.type) {
    case GET_USER_PROFILE:
      return ;
    default:
      return state;
  }
}