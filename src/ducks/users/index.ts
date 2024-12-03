import { createReducer } from "@reduxjs/toolkit";
import { makeRequesActions } from "../ActionTypes";
import { all } from "redux-saga/effects";

export const [
    GET_ALL_USERS,
    requestAllUsers,
    successAllUsers,
    failureAllUsers,
] = makeRequesActions('GET_ALL_USERS');


const initialState = {
    allUsers: [],
    isLoading: false,
    error: null,
};

export default createReducer(initialState, (builder) => {
    builder.addCase(GET_ALL_USERS.REQUEST, (state) => {
        state.isLoading = true;
    });
    builder.addCase(GET_ALL_USERS.SUCCESS, (state, action) => {
        state.isLoading = false;
        state.allUsers = action.payload;  // Update the state with the fetched users
    });
    builder.addCase(GET_ALL_USERS.FAILURE, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.errorMessage; 
    });
});


export const selectAllUsers = (state: any) => state.users.allUsers || [];
export const selectIsLoading = (state: any) => state.users.isLoading;
export const selectError = (state: any) => state.users.error;