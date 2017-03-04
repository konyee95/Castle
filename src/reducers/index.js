import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import ExpensesReducer from './ExpensesReducer';

export default combineReducers({
  auth: AuthReducer,
  profile: ProfileReducer,
  expenses: ExpensesReducer
})
