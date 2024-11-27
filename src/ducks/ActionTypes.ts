import {createAction} from '@reduxjs/toolkit';

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export const CANCEL = 'CANCEL';
export const RESET = 'RESET';

export const defaultTypes = [REQUEST, SUCCESS, FAILURE, CANCEL, RESET];
export const requestTypes = [REQUEST, SUCCESS, FAILURE];

//ACTION TYPES

// auth
export const AUTH_IDENTIFIER_LOGIN = 'login';
export const AUTH_IDENTIFIER_SIGN_UP = 'signup';
export const AUTH_IDENTIFIER_FORGOT = 'forgot';
export const AUTH_IDENTIFIER_RESET = 'resetPassword';
export const AUTH_IDENTIFIER_SEND_VERIFICATION_EMAIL =
  'send_verification_email';
export const AUTH_IDENTIFIER_VALIDATE_USERNAME = 'validate_username';
export const AUTH_IDENTIFIER_CHANGE_PASSWORD = 'changePassword';
export const AUTH_IDENTIFIER_UPDATE_PROFILE = 'update_profile';
export const AUTH_IDENTIFIER_SEND_VERIFICATION_PHONE =
  'send_verification_phone';
export const AUTH_IDENTIFIER_VERIFY_PHONE = 'verify_phone';
export const VENDOR_IDENTIFIER_VERIFY_PHONE = 'vendor_phone';
//
export const IDENTIFIER_UNIONS = 'unions';

export default function createRequestTypes(base: any, types = defaultTypes) {
  const res: any = {};
  types.forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const makeRequesActions = (base: any, types = defaultTypes) => {
  const reqType: any = {type: base};
  types.forEach(type => {
    reqType[type] = `${base}_${type}`;
  });
  const requestActions = [reqType];
  requestTypes.map(item => requestActions.push(createAction(reqType[item])));
  return requestActions;
};

export const makeAction = (base: any) => {
  const action = createAction(base);
  return [base, action];
};
