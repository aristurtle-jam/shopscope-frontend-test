import {combineReducers} from 'redux';

import auth, {LOGOUT, USER_KICKED} from './auth';
import snackbarReducer from './snackbar';
import products from './products';
import posts from './posts';
import profile from './profile';
import users from './users';
import wishlists from './wishlists';


const appReducer = combineReducers({
  auth,
  snackbar: snackbarReducer,
  products,
  posts,
  profile,
  users,
  wishlists
  // pushToken,
});

export default (state: any, action: any) => {
  if (action.type === LOGOUT.SUCCESS || action.type === USER_KICKED) {
    const {network, general, cms} = state;
    state = {network, general, cms};
  }
  return appReducer(state, action);
};
