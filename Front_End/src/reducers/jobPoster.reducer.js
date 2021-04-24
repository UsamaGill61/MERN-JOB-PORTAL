import {
  JobPostedConstants,
  getJobsPostedBySingleUserConstants,
  getsinglejobDetail,
  UpdateUser,
  FILLYOURPROFILE,
} from "../actions/constants";

const initState = {
  loading: false,
  setingJobDetailtoNull: false,
  jobposting: false,
  jobpostingError: false,
  error: null,
  message: "",
  Jobs: [],
  SingleJobDetail: {},
  COMPLETE_YOUR_PROFILE_ERROR: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case JobPostedConstants.JOB_POSTED_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case JobPostedConstants.JOB_POSTED_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
        jobposting: true,
      };
      break;
    case JobPostedConstants.JOB_POSTED_FAILURE:
      state = {
        ...state,
        loading: false,
        message2: action.payload.message,
        jobpostingError: true,
      };
      break;
    case getJobsPostedBySingleUserConstants.GET_JOB_POSTED_BY_SINGLE_USER_SUCCESS:
      state = {
        ...state,
        Jobs: action.payload.Jobs,
      };
      break;
    case getsinglejobDetail.GET_JOB_DETAIL_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case getsinglejobDetail.GET_JOB_DETAIL_SUCCESS:
      state = {
        ...state,
        loading: false,
        SingleJobDetail: action.payload.JobDetail,
        setingJobDetailtoNull: true,
        COMPLETE_YOUR_PROFILE_ERROR:""
      };
      break;

    case getsinglejobDetail.GET_JOB_DETAIL_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.error,
        COMPLETE_YOUR_PROFILE_ERROR:""
      };
      break;
    case UpdateUser.RESET_UPDATE_USER:
      state = {
        ...state,
        SingleJobDetail: {},
      };
      break;
    case FILLYOURPROFILE.FILLYOURPROFILE_RESPONSE:
      state = {
        ...state,
        COMPLETE_YOUR_PROFILE_ERROR: action.payload,
      };
      break;
  }
  return state;
};
