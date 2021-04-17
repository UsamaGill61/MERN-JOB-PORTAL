import { authConstants, userContants, UpdateUser } from "../actions/constants";

const initState = {
  token: null,
  user: {},
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: "",
  UpdateUser: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        authenticating: false,
      };
      break;
    case userContants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case userContants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;
    case UpdateUser.UPDATE_USER_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case UpdateUser.UPDATE_USER_SUCCESS:
      state = {
        ...state,
        user: action.payload,
        authenticating: false,
        UpdateUser: true,
      };
      break;
    case UpdateUser.RESET_UPDATE_USER:
      state = {
        ...state,

        UpdateUser: false,
      };
      break;
    case userContants.USER_REGISTER_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        authenticating: false,
      };
      break;
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
        message: action.payload.message,
      };
      break;
  }
  return state;
};
