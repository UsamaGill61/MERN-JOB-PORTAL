import axiosInstance from "../helpers/axios";
import {
  JobPostedConstants,
  getJobsPostedBySingleUserConstants,
  getsinglejobDetail,
  GETSINGLEUSERDETAIL,
} from "./constants";

export const PostJob = (job) => {
  return async (dispatch) => {
    dispatch({ type: JobPostedConstants.JOB_POSTED_REQUEST });
    const res = await axiosInstance.post("/postjob", {
      ...job,
    }); 
    if (res.status === 201) {
      dispatch({ 
        type: JobPostedConstants.JOB_POSTED_SUCCESS,
        payload: {
          message: "Job Posted Successfully.....",
        },
      });
      return true;
    } else {
      dispatch({
        type: JobPostedConstants.JOB_POSTED_FAILURE,
        payload: {
          message: "Something Went Wrong.....",
        },
      });
    }
  };
};

export const getJobsPostedBySingleUser = (job) => {
  return async (dispatch) => {
    const res = await axiosInstance.get("/getJobsPostedBySingleUser");
    if (res.status === 201) {
      const { Jobs } = res.data;
      dispatch({
        type:
          getJobsPostedBySingleUserConstants.GET_JOB_POSTED_BY_SINGLE_USER_SUCCESS,
        payload: {
          Jobs,
        },
      });
      return true;
    } else {
      const { message } = res.data;
      dispatch({
        type:
          getJobsPostedBySingleUserConstants.GET_JOB_POSTED_BY_SINGLE_USER_FAILURE,
        payload: {
          message,
        },
      });
    }
  };
};

export const getJobsDetail = (payload) => {
  return async (dispatch) => {
    dispatch({ type: getsinglejobDetail.GET_JOB_DETAIL_REQUEST });
    let res;
    try {
      const { jobid } = payload.params;
      res = await axiosInstance.get(`/getJobsDetail/${jobid}`);
      dispatch({
        type: getsinglejobDetail.GET_JOB_DETAIL_SUCCESS,
        payload: { JobDetail: res.data.JobDetail },
      });
    } catch (error) {
      dispatch({
        type: getsinglejobDetail.GET_JOB_DETAIL_FAILURE,
        payload: { error: res.data.messagae },
      });
    }
  };
};

export const getSingleUserDetail = (SingleUserId) => {

  return async (dispatch) => {
    dispatch({ type: GETSINGLEUSERDETAIL.GETSINGLEUSERDETAIL_REQUEST });
    const res = await axiosInstance.get(`/getSingleuserDetail/${SingleUserId}`);
    if (res.status === 201) {
      const { user } = res.data;
      dispatch({
        type: GETSINGLEUSERDETAIL.GETSINGLEUSERDETAIL_SUCCESS,
        payload: {
          user,
        },
      }); 
    } else {
      // dispatch({
      //   type: authConstants.LOGIN_FAILURE,
      //   payload: { error: res.data.message },
      // });
    }
  };
};
