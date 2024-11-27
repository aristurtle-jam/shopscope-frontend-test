import _ from 'lodash';
import { take, put, fork, call, takeLatest } from 'redux-saga/effects';
import {
  LOGIN,
  successLogin,
  failureLogin,
  SIGNUP,
  failureSignup,
  successSignup,
  successLogout,
  failureLogout,
  LOGOUT,
  FORGOT_PASSWORD,
  failureForgotPassword,
  successForgotPassword,
  VERIFY_OTP,
  successVerifyOTP,
  failureVerifyOTP,
  RESET_PASSWORD,
  successResetPassword,
  failureResetPassword,
} from './';
import {
  API_FORGOT_PASSWORD,
  API_LOGIN, API_LOGOUT, API_RESET_PASSWORD, API_SIGNUP, API_VERIFY_OTP,
} from '../../config/webService';
import { callRequest, callRequestFileUpload } from '../../utils/ApiSauce';
import { NavigationService } from '../../config';
import { showSnackbar } from '../snackbar';



function* watchLogin(): any {
  while (true) {
    const { payload } = yield take(LOGIN.REQUEST);
    try {
      let response = yield call(callRequest, API_LOGIN, payload);
      if (response.status === 200) {
        yield put(successLogin({ loginData: response.data, token: response.token }));
        NavigationService.reset('MainAppStack')
      }
    } catch (error: any) {
      yield put(failureLogin({ errorMessage: error }));
      yield put(showSnackbar({message: error.message, type: 'error'}))
    }
  }
}

function* watchSignUp(): any {
  while (true) {
    const { payload } = yield take(SIGNUP.REQUEST);
    try {
      let response = yield call(callRequest, API_SIGNUP, payload);
      if (response.data) {
        yield put(successSignup({ signupData: response.data }))
        yield put(showSnackbar({ message: "Profile Created Successfully, Please enter you login details.", type: "success" }));
        NavigationService.navigate('LoginScreen')
      }
    } catch (error: any) {
      yield put(failureSignup({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }));
    }
  }
}

function* watchLogout(): any {
  while (true) {
    const { payload } = yield take(LOGOUT.REQUEST);
    try {
      let response = yield call(callRequest, API_LOGOUT, payload);
      if (response.data) {
        yield put(successLogout({ logoutData: response.data }))
        yield put(showSnackbar({ message: "You are logged out", type: "success" }));
        NavigationService.navigate('LoginScreen')
      }
    } catch (error: any) {
      yield put(failureLogout({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }));
    }
  }
}

function* watchForgotPassword(): any {
  while (true) {
    const { payload } = yield take(FORGOT_PASSWORD.REQUEST);
    try {
      let response = yield call(callRequest, API_FORGOT_PASSWORD, payload, {}, payload.email);
      if (response.data) {
        yield put(successForgotPassword({ forgotPasswordData: response.data }))
        yield put(showSnackbar({ message: "OTP Sent to your email.", type: "success" }));
        if (!payload.resend) 
        {
          NavigationService.navigate('OTPScreen', response.data.msg)
        }
      }
    } catch (error: any) {
      yield put(failureForgotPassword({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }));
    }
  }
}

function* watchVerifyOTP(): any {
  while (true) {
    const { payload } = yield take(VERIFY_OTP.REQUEST);
    try {
      let response = yield call(callRequest, API_VERIFY_OTP, payload, {}, payload.urlParam);
      if (response.data) {
        yield put(successVerifyOTP())
        yield put(showSnackbar({ message: 'Please enter your new password', type: 'info' }));
        NavigationService.navigate('ResetPasswordScreen')
      }
    } catch (error: any) {
      yield put(failureVerifyOTP({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }));
    }
  }
}

function* watchResetPassword(): any {
  while (true) {
    const { payload } = yield take(RESET_PASSWORD.REQUEST);
    try {
      let response = yield call(callRequest, API_RESET_PASSWORD, payload);
      if (response.data) {
        yield put(successResetPassword())
        yield put(showSnackbar({ message: 'Password Reset Successfully', type: 'success' }));
        NavigationService.navigate('LoginScreen')
      }
    } catch (error: any) {
      yield put(failureResetPassword({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }));
    }
  }
}




export default function* root() {
  yield fork(watchLogin);
  yield fork(watchSignUp);
  yield fork(watchLogout);
  yield fork(watchForgotPassword);
  yield fork(watchVerifyOTP);
  yield fork(watchResetPassword);
}
