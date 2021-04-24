import axiosInstance from "../helpers/axios";
import { GET_ALL_USER_SEARCH } from "./constants";

export const getAllUsers_Search = ({ pageNumber, QueryWord }) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_USER_SEARCH.GET_ALL_USER_SEARCH_REQUEST });
    const res = await axiosInstance.get(
      `/getAllUsers_SearchJobs?page=${pageNumber}&queryWord=${QueryWord}`
    );
    const { totalPages, Users } = res.data;
    if (res.status === 200) {
      dispatch({
        type: GET_ALL_USER_SEARCH.GET_ALL_USER_SEARCH_SUCCESS,
        payload: { totalPages, Users },
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
