import _ from 'lodash';
import { take, put, fork, call } from 'redux-saga/effects';
import {
  API_FOLLOW_USER,
  API_GET_MY_PROFILE, API_GET_NOTIFICATIONS, API_GET_OTHERS_PROFILE, API_UNFOLLOW_USER, API_UPDATE_PASSWORD, API_UPDATE_PROFILE
} from '../../config/webService';
import { callRequest, callRequestFileUpload } from '../../utils/ApiSauce';
import { showSnackbar } from '../snackbar';
import { GET_MY_PROFILE, successMyProfile, failureMyProfile, UPDATE_PROFILE, failureUpdateProfile, successUpdateProfile, CHANGE_PASSWORD, successChangePassword, failureChangePassword, GET_OTHERS_PROFILE, successOthersProfile, failureOthersProfile, successGetNotifications, failureGetNotifications, GET_NOTIFICATIONS, FOLLOW_USER, successFollowUser, failureFollowUser, UNFOLLOW_USER, successUnfollowUser, failureUnfollowUser, requestOthersProfile } from '.';
import { NavigationService } from '../../config';



function* watchGetProfile(): any {
  while (true) {
    const { payload } = yield take(GET_MY_PROFILE.REQUEST);
    try {
      let response = yield call(callRequest, API_GET_MY_PROFILE, payload);
      if (response) {
        yield put(successMyProfile(response.data));
      }
    } catch (error: any) {
      yield put(failureMyProfile({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }))
    }
  }
}

function* watchUpdateProfile(): any {
  while (true) {
    const { payload } = yield take(UPDATE_PROFILE.REQUEST);
    let i
    try {
      let response = yield call(callRequestFileUpload, API_UPDATE_PROFILE, payload);
      if (response) {
        yield put(successUpdateProfile(response.data));
      }
    } catch (error: any) {
      yield put(failureUpdateProfile({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }))
    }
  }
}

function* watchChangePassword(): any {
  while (true) {
    const { payload } = yield take(CHANGE_PASSWORD.REQUEST);
    let i
    try {
      let response = yield call(callRequest, API_UPDATE_PASSWORD, payload);
      if (response) {
        yield put(successChangePassword(response.data));
        yield put(showSnackbar({ message: response.msg, type: 'success' }))
        NavigationService.goBack()
      }
    } catch (error: any) {
      yield put(failureChangePassword({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }))
    }
  }
}

function* watchGetOthersProfile(): any {
  while (true) {
    const { payload } = yield take(GET_OTHERS_PROFILE.REQUEST);
    try {
      let response = yield call(callRequest, API_GET_OTHERS_PROFILE, payload.pagination, {}, payload.id);
      if (response) {
        yield put(successOthersProfile(response.data));
      }
    } catch (error: any) {
      yield put(failureOthersProfile({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }))
    }
  }
}

function* watchGetNotificaions(): any {
  while (true) {
    const { payload } = yield take(GET_NOTIFICATIONS.REQUEST);
    try {
      let response = yield call(callRequest, API_GET_NOTIFICATIONS, payload);
      if (response) {
        yield put(successGetNotifications(response.data));
      }
    } catch (error: any) {
      yield put(failureGetNotifications({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }))
    }
  }
}

function* watchFollowUser(): any {
  while (true) {
    const { payload } = yield take(FOLLOW_USER.REQUEST);
    try {
      let response = yield call(callRequest, API_FOLLOW_USER, {}, {}, payload.id);
      if (response) {
        yield put(successFollowUser(response.data));
        yield put(showSnackbar({ message: response.msg, type: 'success' }))
        yield put(requestOthersProfile({ id: payload.id }));

      }
    } catch (error: any) {
      yield put(failureFollowUser({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }))
    }
  }
}

function* watchUnfollowUser(): any {
  while (true) {
    const { payload } = yield take(UNFOLLOW_USER.REQUEST);
    try {
      let response = yield call(callRequest, API_UNFOLLOW_USER, {}, {}, payload.id);
      if (response) {
        yield put(successUnfollowUser(response.data));
        yield put(showSnackbar({ message: response.msg, type: 'info' }))
        yield put(requestOthersProfile({ id: payload.id }));

      }
    } catch (error: any) {
      yield put(failureUnfollowUser({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }))
    }
  }
}







export default function* root() {
  yield fork(watchGetProfile);
  yield fork(watchUpdateProfile);
  yield fork(watchChangePassword);
  yield fork(watchGetOthersProfile);
  yield fork(watchGetNotificaions);
  yield fork(watchFollowUser);
  yield fork(watchUnfollowUser);
}
