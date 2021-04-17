import axiosInstance from "../helpers/axios";
import { getAllJobs } from "./constants";

export const getAllJobsInitially = ({pageNumber,QueryWord}) => {
  return async (dispatch) => {
    dispatch({ type: getAllJobs.GET_ALL_JOBS_REQUEST });
    const res = await axiosInstance.get(`/getAllJobs_SearchJobs?page=${pageNumber}&queryWord=${QueryWord}`);
    const { Jobs, totalPages,totalJobs,totalRegisteredUsers } = res.data;
    if (res.status === 200) {
      dispatch({
        type: getAllJobs.GET_ALL_JOBS_SUCCESS,
        payload: { Jobs, totalPages,totalRegisteredUsers,totalJobs },
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
