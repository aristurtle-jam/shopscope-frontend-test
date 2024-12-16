import { createReducer } from "@reduxjs/toolkit";
import { makeRequesActions } from "../ActionTypes";

export const [
    GET_ALL_USERS,
    requestAllUsers,
    successAllUsers,
    failureAllUsers,
] = makeRequesActions('GET_ALL_USERS');

export const [
    ADD_SWIPED_LEFT,
    requestAddSwipedLeft,
    successAddSwipedLeft,
    failureAddSwipedLeft,
] = makeRequesActions('ADD_SWIPED_LEFT');


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
    builder.addCase(ADD_SWIPED_LEFT.REQUEST, (state) => {
        state.isLoading = true;
    });
    builder.addCase(ADD_SWIPED_LEFT.SUCCESS, (state) => {
        state.isLoading = false;
    });
});


export const selectAllUsers = (state: any) => state.users.allUsers || [];
export const selectIsLoading = (state: any) => state.users.isLoading;
export const selectError = (state: any) => state.users.error;