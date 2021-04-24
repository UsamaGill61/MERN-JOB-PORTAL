import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import LandingPage from "./containers/LandingPage/LandingPage";
import { isUserLogedIn } from "./actions";
import LoaderAnimation from "./components/LoaderAnimation/LoaderAnimation";
import ApplicationLoginPage from "./containers/ApplicationLoginPage/ApplicationLoginPage";
import JobPosterLoginPage from "./containers/JobPosterLoginPage/JobPosterLoginPage";
import RecuireterLoginPage from "./containers/RecuireterLoginPage/RecuireterLoginPage";
import JobDetailPage from "./containers/JobDetailPage/JobDetailPage";
import UpdateYourProfile from "./containers/ApplicationLoginPage/UpdateYourProfile";
import View_All_Applcations from "./containers/JobPosterLoginPage/View_All_Applcations";

const App = (props) => {
  const [loader, setloader] = useState(false);
  const dispatch = useDispatch();

  let auth = useSelector((state) => state.auth);
  const jobPosting = useSelector((state) => state.jobPosting);
  const initialData = useSelector(state => state.initialData)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLogedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    if (auth.authenticating || auth.loading || jobPosting.loading || initialData.loading)
      return setloader(true);
    else return setloader(false);
  }, [auth.authenticating, auth.loading, jobPosting.loading,initialData.loading]);

  return (
    <div>
      <Header />
      <Route path="/" exact component={LandingPage} />
      {!auth.authenticate ? (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      ) : null}
      {auth.authenticate && auth.user.role === "Applicant" ? (
        <Redirect
          to={{
            pathname: "/ApplicationLoginPage",
          }}
        />
      ) : null}
      {auth.authenticate && auth.user.role === "Poster" ? (
        <Redirect
          to={{
            pathname: "/JobPosterLoginPage",
          }}
        />
      ) : null}
      {auth.authenticate && auth.user.role === "Recureter" ? (
        <Redirect
          to={{
            pathname: "/RecuireterLoginPage",
          }}
        />
      ) : null}

      <LoaderAnimation loader={loader} setloader={setloader} />

      <Switch>
        <Route path="/ApplicationLoginPage" component={ApplicationLoginPage} />
        <Route path="/JobPosterLoginPage" component={JobPosterLoginPage} />
        <Route path="/RecuireterLoginPage" component={RecuireterLoginPage} />
        <Route path="/updateYourProfile" component={UpdateYourProfile} />
        
        <Route path="/:AppliedUserId/user/completeProfile" component={ApplicationLoginPage} />
        <Route path="/:Applicants/jobAppliedCandidates" component={View_All_Applcations} />
        <Route path="/:jobid" component={JobDetailPage} />

      </Switch>
    </div>
  );
};

export default App;
