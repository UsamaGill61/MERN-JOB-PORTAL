import axiosInstance from "../helpers/axios";
import { authConstants, cartConstants, userContants } from "./constants";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const res = await axiosInstance.post("/login", {
      ...user,
    });
    if (res.status === 201) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
      // window.location.reload(false);
      return true;
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: res.data.message },
      });
    }
  };
};


export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: userContants.USER_REGISTER_REQUEST });
    const res = await axiosInstance.post("/signup", {
      ...user,
    });
    console.log(res);
    if (res.status === 201) {
      const { token, user } = res.data;
      console.log(res.cookie);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: userContants.USER_REGISTER_SUCCESS,
        payload: {
          token,
          user,  
        },
      });
    } else {
      dispatch({
        type: userContants.USER_REGISTER_FAILURE,
        payload: { error: res.data.message },
      });
    }
  };
};
export const isUserLogedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: null },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    const res = await axiosInstance.post("/logout");
    if (res.status === 200) {
      localStorage.clear();
      dispatch({
        type: authConstants.LOGOUT_SUCCESS,
        payload: { message: res.data.message },
      });
      
    }
  };
};
