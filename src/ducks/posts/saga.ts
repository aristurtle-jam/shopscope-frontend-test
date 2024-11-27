import _ from 'lodash';
import { take, put, fork, call, takeLatest } from 'redux-saga/effects';
import {
API_CREATE_POST, API_GET_MY_POST, API_GET_ALL_POST, API_POST_LIKE, API_POST_DISLIKE, API_POST_DELETE, API_EDIT_POST, API_GET_OTHERS_POST
} from '../../config/webService';
import { callRequest, callRequestFileUpload } from '../../utils/ApiSauce';
import { NavigationService } from '../../config';
import { showSnackbar } from '../snackbar';
import { CREATE_POST, DELETE_POST, EDIT_POST, GET_ALL_POSTS, GET_MY_POSTS, GET_OTHERS_POSTS, POST_DISLIKE, POST_LIKE, failureCreatePost, failureDeletePost, failureGetAllPosts, failureGetMyPosts, failureGetOthersPosts, failurePostDisike, failurePostLike, successCreatePost, successDeletePost, successGetAllPosts, successGetMyPosts, successGetOthersPosts, successPostDisike, successPostLike } from '.';



function* watchCreatePost(): any {
  while (true) {
    const { payload } = yield take(CREATE_POST.REQUEST);
    try {
      let response = yield call(callRequestFileUpload, API_CREATE_POST, payload);
      if (response) {
        yield put(successCreatePost({ productList: response }));
        yield put(showSnackbar({ message: 'Posted Successfully', type: 'success' }))
        NavigationService.goBack()

      }
    } catch (error: any) {
      yield put(failureCreatePost({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }))
    }
  }
}

function* watchGetMyPosts(): any {
  while (true) {
    const  {payload}  = yield take(GET_MY_POSTS.REQUEST);
    try {
      let response = yield call(callRequest, API_GET_MY_POST, payload);
      if (response) {
        yield put(successGetMyPosts(response.data));
      }
    } catch (error: any) {
      yield put(failureGetMyPosts({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }))
    }
  }
}

function* watchGetOthersPosts(): any {
  while (true) {
    const  {payload}  = yield take(GET_OTHERS_POSTS.REQUEST);
    try {
      let response = yield call(callRequest, API_GET_OTHERS_POST, payload.pagination, {}, payload.id);
      if (response) {
        yield put(successGetOthersPosts(response.data));
      }
    } catch (error: any) {
      yield put(failureGetOthersPosts({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }))
    }
  }
}


function* watchGetAllPosts(): any {
  while (true) {
      const { payload } = yield take(GET_ALL_POSTS.REQUEST);
      try {
          let response = yield call(callRequest, API_GET_ALL_POST, payload); // Update this line
          if (response) {
              yield put(successGetAllPosts(response.data));
          }
      } catch (error: any) {
          yield put(failureGetAllPosts({ errorMessage: error }));
          yield put(showSnackbar({ message: error.message, type: 'error' }));
      }
  }
}
function* watchLikePost(): any {
  while (true) {
    const {payload}  = yield take(POST_LIKE.REQUEST);
    try {
      let response = yield call(callRequest, API_POST_LIKE, {}, {}, payload);
      if (response) {
        yield put(successPostLike(response.data));
      }
    } catch (error: any) {
      yield put(failurePostLike({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }))
    }
  }
}

function* watchDisikePost(): any {
  while (true) {
    const {payload}  = yield take(POST_DISLIKE.REQUEST);
    try {
      let response = yield call(callRequest, API_POST_DISLIKE, {}, {}, payload);
      if (response) {
        yield put(successPostDisike(response.data));
      }
    } catch (error: any) {
      yield put(failurePostDisike({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }))
    }
  }
}

function* watchDeletePost(): any {
  while (true) {
    const {payload}  = yield take(DELETE_POST.REQUEST);
    try {
      let response = yield call(callRequest, API_POST_DELETE, {}, {}, payload.id);
      if (response) {
        yield put(successDeletePost({id: payload.id}));
      }
    } catch (error: any) {
      yield put(failureDeletePost({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }))
    }
  }
}

function* watchEditPost(): any {
  while (true) {
    const { payload } = yield take(EDIT_POST.REQUEST);

    try {
      let response = yield call(callRequestFileUpload, API_EDIT_POST, payload.formData, payload.id);
      if (response) {
        yield put(successCreatePost());
        yield put(showSnackbar({ message: 'Post Updated', type: 'success' }))
        NavigationService.goBack()

      }
    } catch (error: any) {
      yield put(failureCreatePost({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }))
    }
  }
}


export default function* root() {
  yield fork(watchCreatePost);
  yield fork(watchGetMyPosts);
  yield fork(watchGetAllPosts);
  yield fork(watchLikePost);
  yield fork(watchDisikePost);
  yield fork(watchDeletePost);
  yield fork(watchEditPost);
  yield fork(watchGetOthersPosts);
}
