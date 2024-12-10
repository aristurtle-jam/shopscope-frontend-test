import {combineReducers} from 'redux';

import auth, {LOGOUT, USER_KICKED} from './auth';
import snackbarReducer from './snackbar';
import products from './products';
import posts from './posts';
import profile from './profile';
import cart from './cart';
import order from './order';
import users from './users';


const appReducer = combineReducers({
  auth,
  snackbar: snackbarReducer,
  products,
  posts,
  profile,
  cart,
  order,
  users
});

export default (state: any, action: any) => {
  if (action.type === LOGOUT.SUCCESS || action.type === USER_KICKED) {
    const {network, general, cms} = state;
    state = {network, general, cms};
  }
  return appReducer(state, action);
};
