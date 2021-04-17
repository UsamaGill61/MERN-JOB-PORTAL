import axiosInstance from "../helpers/axios";
import { UpdateUser } from "./constants";

export const UpdateApplicant = (form) => {
  return async (dispatch) => {
    dispatch({ type: UpdateUser.UPDATE_USER_REQUEST });
    const res = await axiosInstance.post("/updateCandidateProfile", form);
    console.log(res);
    const { user } = res.data;
    if (res.status === 201) {
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: UpdateUser.UPDATE_USER_SUCCESS,
        payload: user,
      });
    }
    // else {
    //   dispatch({
    //     type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
    //     payload: { error: res.data.error },
    //   });
    // }
  };
};
export const ApplyToTheJob = (jobid) => {
  return async (dispatch) => {
    const res = await axiosInstance.post(`/ApplyToTheJob/${jobid}`);
    return true;

  };
};
export const ResetRoute = (form) => {
  return async (dispatch) => {
    dispatch({ type: UpdateUser.RESET_UPDATE_USER });

    // else {
    //   dispatch({
    //     type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
    //     payload: { error: res.data.error },
    //   });
    // }
  };
};
