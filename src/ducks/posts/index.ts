import { createReducer } from '@reduxjs/toolkit';
import { makeRequesActions, makeAction } from '../ActionTypes';

export const [
    CREATE_POST,
    requestCreatePost,
    successCreatePost,
    failureCreatePost,
] = makeRequesActions('CREATE_POST');

export const [
    GET_MY_POSTS,
    requestGetMyPosts,
    successGetMyPosts,
    failureGetMyPosts,
] = makeRequesActions('GET_MY_POSTS');

export const [
    GET_OTHERS_POSTS,
    requestGetOthersPosts,
    successGetOthersPosts,
    failureGetOthersPosts,
] = makeRequesActions('GET_OTHERS_POSTS');

export const [
    GET_ALL_POSTS,
    requestGetAllPosts,
    successGetAllPosts,
    failureGetAllPosts,
] = makeRequesActions('GET_ALL_POSTS');

export const [
    POST_LIKE,
    requestPostLike,
    successPostLike,
    failurePostLike,
] = makeRequesActions('POST_LIKE');

export const [
    POST_DISLIKE,
    requestPostDisike,
    successPostDisike,
    failurePostDisike,
] = makeRequesActions('POST_DISLIKE');

export const [
    DELETE_POST,
    requestDeletePost,
    successDeletePost,
    failureDeletePost,
] = makeRequesActions('DELETE_POST');
export const [
    EDIT_POST,
    requestEditPost,
    successEditPost,
    failureEditPost,
] = makeRequesActions('EDIT_POST');



const initalState = {
    createPost: {},
    isLoading: {},
    myPosts: {},
    allPosts: {
        currentPage: 1,
        totalPages: 1, // Initial value
        posts: [],
    },
    othersPosts: {}
};

// selectors

export const getUserToken = (store: any) => store.auth?.token ?? '';


// init reducer
export default createReducer(initalState, builder => {
    builder.addCase(CREATE_POST.REQUEST, (state, action) => {
        state.isLoading = true
    });
    builder.addCase(CREATE_POST.SUCCESS, (state, action) => {
        state.isLoading = false
        state.createPost = action.payload
    });
    builder.addCase(CREATE_POST.FAILURE, (state, action) => {
        state.isLoading = false
    });
    builder.addCase(GET_MY_POSTS.REQUEST, (state, action) => {
        state.isLoading = true
    });
    builder.addCase(GET_MY_POSTS.SUCCESS, (state, action) => {
        state.isLoading = false
        state.myPosts = action.payload
    });
    builder.addCase(GET_MY_POSTS.FAILURE, (state, action) => {
        state.isLoading = false
    });
    builder.addCase(GET_OTHERS_POSTS.REQUEST, (state, action) => {
        state.isLoading = true
    });
    builder.addCase(GET_OTHERS_POSTS.SUCCESS, (state, action) => {
        state.isLoading = false
        state.othersPosts = action.payload
    });
    builder.addCase(GET_OTHERS_POSTS.FAILURE, (state, action) => {
        state.isLoading = false
    });
    builder.addCase(GET_ALL_POSTS.REQUEST, (state, action) => {
        state.isLoading = true
    });
    builder.addCase(GET_ALL_POSTS.SUCCESS, (state, action) => {
        state.isLoading = false;
        state.allPosts = {
            ...state.allPosts,
            currentPage: action.payload.page,
            totalPages: action.payload.totalPages,
            posts: [...state.allPosts.posts, ...action.payload.posts],
        };
    });
    builder.addCase(GET_ALL_POSTS.FAILURE, (state, action) => {
        state.isLoading = false
    });

    builder.addCase(POST_LIKE.REQUEST, (state, action) => {
        // state.isLoading = true
    });
    builder.addCase(POST_LIKE.SUCCESS, (state, action) => {
        // state.isLoading = false
    });
    builder.addCase(POST_LIKE.FAILURE, (state, action) => {
        // state.isLoading = false
    });
    builder.addCase(POST_DISLIKE.REQUEST, (state, action) => {
        // state.isLoading = true
    });
    builder.addCase(POST_DISLIKE.SUCCESS, (state, action) => {
        // state.isLoading = false
    });
    builder.addCase(POST_DISLIKE.FAILURE, (state, action) => {
        // state.isLoading = false
    });
    builder.addCase(DELETE_POST.REQUEST, (state, action) => {
        // state.isLoading = true
    });
    builder.addCase(DELETE_POST.SUCCESS, (state, action) => {
        const index = state.myPosts.posts.findIndex((item: any) => item._id === action.payload.id);
        if (index !== -1) {
            state.myPosts.posts.splice(index, 1);
        }
        // state.isLoading = false
    });
    builder.addCase(DELETE_POST.FAILURE, (state, action) => {
        // state.isLoading = false
    });
    builder.addCase(EDIT_POST.REQUEST, (state, action) => {
        // state.isLoading = true
    });
    builder.addCase(EDIT_POST.SUCCESS, (state, action) => {
        // state.isLoading = false
    });
    builder.addCase(EDIT_POST.FAILURE, (state, action) => {
        // state.isLoading = false
    });

});
