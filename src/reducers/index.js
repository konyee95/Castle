import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import ExpensesReducer from './ExpensesReducer';
import IncomeReducer from './IncomeReducer';

export default combineReducers({
  auth: AuthReducer,
  profile: ProfileReducer,
  expenses: ExpensesReducer,
  income: IncomeReducer
})
