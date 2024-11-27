import { createReducer } from '@reduxjs/toolkit';
import { makeRequesActions, makeAction } from '../ActionTypes';

export const [
    LOGIN,
    requestLogin,
    successLogin,
    failureLogin,
] = makeRequesActions('LOGIN');

export const [
    SIGNUP,
    requestSignup,
    successSignup,
    failureSignup,
] = makeRequesActions('SIGNUP');

export const [USER_KICKED, UserKicked] = makeAction('USER_KICKED');

export const [
    LOGOUT,
    requestLogout,
    successLogout,
    failureLogout
] = makeRequesActions('LOGOUT');

export const [
    FORGOT_PASSWORD,
    requestForgotPassword,
    successForgotPassword,
    failureForgotPassword
] = makeRequesActions('FORGOT_PASSWORD');

export const [
    VERIFY_OTP,
    requestVerifyOTP,
    successVerifyOTP,
    failureVerifyOTP
] = makeRequesActions('VERIFY_OTP');

export const [
    RESET_PASSWORD,
    requestResetPassword,
    successResetPassword,
    failureResetPassword
] = makeRequesActions('RESET_PASSWORD');




const initalState = {
    loginData: {},
    signupData: {},
    isLoading: false,
    userLoggedIn: false,
    token: '',
    logoutData: {},
    forgotPasswordData: {},
    otpEmail: '',
    otpData: {},
    otpCode: ''
};

// selectors

export const getUserToken = (store: any) => store.auth?.token ?? '';


// init reducer
export default createReducer(initalState, builder => {
    builder.addCase(LOGIN.REQUEST, (state, action) => {
        state.isLoading = true
    });
    builder.addCase(LOGIN.SUCCESS, (state, action) => {
        state.loginData = action.payload.loginData;
        state.token = action.payload.token
        state.isLoading = false
        state.userLoggedIn = true
    });
    builder.addCase(LOGIN.FAILURE, (state, action) => {
        state.loginData = action.payload.data;
        state.isLoading = false
    });
    builder.addCase(SIGNUP.REQUEST, (state, action) => {
        state.isLoading = true
    });
    builder.addCase(SIGNUP.SUCCESS, (state, action) => {
        state.signupData = action.payload.data;
    });
    builder.addCase(SIGNUP.FAILURE, (state, action) => {
        state.signupData = action.payload.data;
        state.isLoading = false
    });
    builder.addCase(LOGOUT.SUCCESS, (state, action) => {
        state.logoutData = action.payload.logoutData;
        state.userLoggedIn = false
    });
    builder.addCase(FORGOT_PASSWORD.REQUEST, (state, action) => {
        state.isLoading = true
        state.otpEmail = action.payload.email
    });
    builder.addCase(FORGOT_PASSWORD.FAILURE, (state, action) => {
        state.isLoading = false
    });
    builder.addCase(FORGOT_PASSWORD.SUCCESS, (state, action) => {
        state.isLoading = false
        state.forgotPasswordData = action.payload.forgotPasswordData
    });
    builder.addCase(VERIFY_OTP.REQUEST, (state, action) => {
        state.isLoading = true
        state.otpCode = action.payload.code
    });
    builder.addCase(VERIFY_OTP.SUCCESS, (state, action) => {
        state.isLoading = false
    });
    builder.addCase(VERIFY_OTP.FAILURE, (state, action) => {
        state.isLoading = false
        state.forgotPasswordData = action.payload.forgotPasswordData
    });
    builder.addCase(RESET_PASSWORD.REQUEST, (state, action) => {
        state.isLoading = true
    });
    builder.addCase(RESET_PASSWORD.SUCCESS, (state, action) => {
        state.isLoading = false
    });
    builder.addCase(RESET_PASSWORD.FAILURE, (state, action) => {
        state.isLoading = false
    });
});
