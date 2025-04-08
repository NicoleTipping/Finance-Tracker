import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  // USER_DETAILS_REQUEST,
  // USER_DETAILS_SUCCESS,
  // USER_DETAILS_FAILURE,
  // USER_DETAILS_UPDATE_REQUEST,
  // USER_DETAILS_UPDATE_SUCCESS,
  // USER_DETAILS_UPDATE_FAILURE,
  // USER_LIST_SUCCESS,
  // USER_LIST_FAILURE,
  // USER_LIST_REQUEST,
  // USER_DELETE_REQUEST,
  // USER_DELETE_SUCCESS,
  // USER_DELETE_FAILURE,
  USER_REGISTER_FAILURE,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
} from '../constants/userActionConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.success,
        userInfo: action.payload,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null
      };
    default:
      return state;
  }
};

export const userLogoutReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return { loading: true };
    case LOGOUT_SUCCESS:
      return { loading: false, success: true };
    case LOGOUT_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: action.payload };
    case USER_REGISTER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};