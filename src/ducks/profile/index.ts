import { createReducer } from '@reduxjs/toolkit';
import { makeRequesActions, makeAction } from '../ActionTypes';

export const [
    GET_MY_PROFILE,
    requestMyProfile,
    successMyProfile,
    failureMyProfile,
] = makeRequesActions('GET_MY_PROFILE');

export const [
    GET_OTHERS_PROFILE,
    requestOthersProfile,
    successOthersProfile,
    failureOthersProfile,
] = makeRequesActions('GET_OTHERS_PROFILE');

export const [
    UPDATE_PROFILE,
    requestUpdateProfile,
    successUpdateProfile,
    failureUpdateProfile,
] = makeRequesActions('UPDATE_PROFILE');

export const [
    CHANGE_PASSWORD,
    requestChangePassword,
    successChangePassword,
    failureChangePassword,
] = makeRequesActions('CHANGE_PASSWORD');

export const [
    GET_NOTIFICATIONS,
    requestGetNotifications,
    successGetNotifications,
    failureGetNotifications,
] = makeRequesActions('GET_NOTIFICATIONS');

export const [
    FOLLOW_USER,
    requestFollowUser,
    successFollowUser,
    failureFollowUser,
] = makeRequesActions('FOLLOW_USER');

export const [
    UNFOLLOW_USER,
    requestUnfollowUser,
    successUnfollowUser,
    failureUnfollowUser,
] = makeRequesActions('UNFOLLOW_USER');


const initalState = {
    myProfile: {},
    profileUpdate: {},
    isLoading: false,
    othersProfile: {},
    notifications: {}
};

// selectors

export const getUserToken = (store: any) => store.auth?.token ?? '';


// init reducer
export default createReducer(initalState, builder => {
    builder.addCase(GET_MY_PROFILE.REQUEST, (state, action) => {
        state.isLoading = true
    });
    builder.addCase(GET_MY_PROFILE.SUCCESS, (state, action) => {
        state.isLoading = false
        state.myProfile = action.payload
    });
    builder.addCase(GET_MY_PROFILE.FAILURE, (state, action) => {
        state.isLoading = false
    });
    builder.addCase(UPDATE_PROFILE.REQUEST, (state, action) => {
        state.isLoading = true
    });
    builder.addCase(UPDATE_PROFILE.SUCCESS, (state, action) => {
        state.isLoading = false
        state.myProfile = action.payload
    });
    builder.addCase(UPDATE_PROFILE.FAILURE, (state, action) => {
        state.isLoading = false
    });
    builder.addCase(CHANGE_PASSWORD.REQUEST, (state, action) => {
        state.isLoading = true
    });
    builder.addCase(CHANGE_PASSWORD.SUCCESS, (state, action) => {
        state.isLoading = false
    });
    builder.addCase(CHANGE_PASSWORD.FAILURE, (state, action) => {
        state.isLoading = false
    });
    builder.addCase(GET_OTHERS_PROFILE.REQUEST, (state, action) => {
        state.isLoading = true
    });
    builder.addCase(GET_OTHERS_PROFILE.SUCCESS, (state, action) => {
        state.isLoading = false
        state.othersProfile = action.payload
    });
    builder.addCase(GET_OTHERS_PROFILE.FAILURE, (state, action) => {
        state.isLoading = false
    });
    builder.addCase(GET_NOTIFICATIONS.REQUEST, (state, action) => {
        state.isLoading = true
    });
    builder.addCase(GET_NOTIFICATIONS.SUCCESS, (state, action) => {
        state.isLoading = false
        state.notifications = action.payload
    });
    builder.addCase(GET_NOTIFICATIONS.FAILURE, (state, action) => {
        state.isLoading = false
    });
    builder.addCase(FOLLOW_USER.REQUEST, (state, action) => {
        state.isLoading = true
    });
    builder.addCase(FOLLOW_USER.SUCCESS, (state, action) => {
        state.isLoading = false
    });
    builder.addCase(FOLLOW_USER.FAILURE, (state, action) => {
        state.isLoading = false
    });
    builder.addCase(UNFOLLOW_USER.REQUEST, (state, action) => {
        state.isLoading = true
    });
    builder.addCase(UNFOLLOW_USER.SUCCESS, (state, action) => {
        state.isLoading = false
    });
    builder.addCase(UNFOLLOW_USER.FAILURE, (state, action) => {
        state.isLoading = false
    });
});
