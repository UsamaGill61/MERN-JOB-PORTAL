import {
  JobPostedConstants,
  getJobsPostedBySingleUserConstants,
  getsinglejobDetail,
} from "../actions/constants";

const initState = {
  loading: false,
  jobposting: false,
  jobpostingError: false,
  error: null,
  message: "",
  Jobs: [],
  SingleJobDetail: {},
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
      };
      break;

    case getsinglejobDetail.GET_JOB_DETAIL_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.error,
      };
      break;
  }
  return state;
};
