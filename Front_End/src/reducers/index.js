import { combineReducers } from "redux";

import auth_reducer from "./auth.reducer";
import job_post_reducer from "./jobPoster.reducer";
import initial_data_reducer from "./initialData.reducer";

const rootReducer = combineReducers({
  auth: auth_reducer,
  jobPosting: job_post_reducer,
  initialData: initial_data_reducer,
});

export default rootReducer;
