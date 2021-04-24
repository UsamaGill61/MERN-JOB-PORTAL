import { getAllJobs, GET_ALL_USER_SEARCH } from "../actions/constants";

const initState = {
  initialJobs: [],
  initialUsers: [],
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
    case GET_ALL_USER_SEARCH.GET_ALL_USER_SEARCH_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_ALL_USER_SEARCH.GET_ALL_USER_SEARCH_SUCCESS:
      state = {
        ...state,
        initialUsers: action.payload.Users,
        totalPages: action.payload.totalPages, 
        loading: false,
      };
      break;
  }
  return state;
};
