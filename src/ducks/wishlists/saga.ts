import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { API_GET_MY_WISHLIST } from '../../config/webService';
import { successMyWishlist, failureMyWishlist } from './index';
import { GET_MY_WISHLIST } from './index';
import { callRequest } from '../../utils/ApiSauce';

function* fetchMyWishlist(): any {
    try {
        const response = yield call(callRequest, API_GET_MY_WISHLIST, {}, {}); // Make the API call
        // Check if response contains valid data
        if (response?.data && Array.isArray(response.data.wishLists)) {
            yield put(successMyWishlist(response.data.wishLists)); // Dispatch success with the users data
        } else {
            throw new Error('Invalid response structure');
        }
    } catch (error: any) {
        const errorMessage = error.message || 'Unexpected error occurred, please contact support.';
        console.error('Fetch My Wishlist Error:', error); // Log the full error
        yield put(failureMyWishlist({ errorMessage })); // Dispatch failure with error message
    }
}

function* watchGetMyWishlist() {
  yield takeEvery(GET_MY_WISHLIST.REQUEST, fetchMyWishlist); // Watch for the action
}

export default function* root() {
  yield fork(watchGetMyWishlist); // Start the watcher saga
}