import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { API_GET_ALL_USERS, API_ADD_SWIPED_LEFT} from '../../config/webService';
import { successAllUsers, failureAllUsers } from './index';
import { GET_ALL_USERS, ADD_SWIPED_LEFT } from './index';
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

function* addSwipedLeft(action: any): any {
    try {
        const { productId } = action.payload; // Extract productId from the action
        console.log("API route:", API_ADD_SWIPED_LEFT.route); // Log the complete URL before the request

        // Make API call with only productId in the body
        const response = yield call(
            callRequest,
            API_ADD_SWIPED_LEFT, // Correct API route
            { productId }, // Only sending productId
            { method: API_ADD_SWIPED_LEFT.type } // Ensure POST method
        );

        if (response?.success) {
            console.log("Product successfully added to swiped left:", productId);
        } else {
            throw new Error(response?.message || "Failed to add product to swiped left.");
        }
    } catch (error: any) {
        console.error("Add Swiped Left Error:", error);
    }
}





function* watchGetAllUsers() {
  yield takeEvery(GET_ALL_USERS.REQUEST, fetchAllUsers); // Watch for the action
}

function* watchAddSwipedLeft() {
    yield takeEvery(ADD_SWIPED_LEFT.REQUEST, addSwipedLeft); // Watch for the action
}

export default function* root() {
  yield fork(watchGetAllUsers); // Start the watcher saga
  yield fork(watchAddSwipedLeft); // Start the watcher saga
}
