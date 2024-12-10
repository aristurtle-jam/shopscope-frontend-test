import {fork} from 'redux-saga/effects';

import auth from './auth/saga';
import products from './products/saga';
import posts from './posts/saga';
import profile from './profile/saga';
import order from './order/saga'
import users from './users/saga';


export default function* root() {
  yield fork(auth)
  yield fork(products)
  yield fork(posts)
  yield fork(profile)
  yield fork(order)
  yield fork(users)
}
