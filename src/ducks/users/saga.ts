import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { API_GET_ALL_USERS } from '../../config/webService';
import { successAllUsers, failureAllUsers } from './index';
import { GET_ALL_USERS } from './index';
import { callRequest } from '../../utils/ApiSauce';

function* fetchAllUsers(): any {
    try {
        const response = yield call(callRequest, API_GET_ALL_USERS, {}, {}); // Make the API call

        // Check if response contains valid data
        if (response?.data && Array.isArray(response.data)) {
            yield put(successAllUsers(response.data)); // Dispatch success with the users data
        } else {
            throw new Error('Invalid response structure');
        }
    } catch (error: any) {
        const errorMessage = error.message || 'Unexpected error occurred, please contact support.';
        console.error('Fetch All Users Error:', error); // Log the full error
        yield put(failureAllUsers({ errorMessage })); // Dispatch failure with error message
    }
}


function* watchGetAllUsers() {
  yield takeEvery(GET_ALL_USERS.REQUEST, fetchAllUsers); // Watch for the action
}

export default function* root() {
  yield fork(watchGetAllUsers); // Start the watcher saga
}
