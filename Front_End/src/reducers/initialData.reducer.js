import { getAllJobs } from "../actions/constants";

const initState = {
  initialJobs: [],
  totalPages: "",
  loading: false,
  totalJobs: "",
  totalRegisteredUsers: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case getAllJobs.GET_ALL_JOBS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case getAllJobs.GET_ALL_JOBS_SUCCESS:
      state = {
        ...state,
        initialJobs: action.payload.Jobs,
        totalPages: action.payload.totalPages,
        totalRegisteredUsers: action.payload.totalRegisteredUsers,
        totalJobs: action.payload.totalJobs,
        loading: false,
      };
      break;

  }
  return state;
};
