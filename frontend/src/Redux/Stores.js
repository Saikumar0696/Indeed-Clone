import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { signUpReducer } from "./Reducers/SignupReducer";
import { loginReducer } from "./Reducers/LoginReducer";
import {
  CompanyDetailsReducer,
  CompanyListReviewReducer,
  UpdateReviewStatusReducer,
  UpdateHelpfulCountReducer,
  getFeaturedReviewsReducer,
} from "./Reducers/CompanyReducer";
import { companyReviewReducer } from "./Reducers/CompanyReviewReducer";
import {
  TopCompanyListReviewReducer,
  TopCompanyListRatingReducer,
  TopAcceptedJobSeekerReducer,
  getAllReviewsReducer,
  getTopRatedCeosReducer,
  getAllCompaniesReducer,
  updatePhotoStatusReducer,
  updateViewCountReducer,
  getTopViewCountReducer,
} from "./Reducers/AdminReducers";
import { jobReducer, jobApplicantsReducer,updateApplicationReducer } from "./Reducers/JobReducer";
import { JOBSEEKER_LOGOUT } from "./Constants/UserConstants";
import { employerJobPostingReducer } from "./Reducers/EmployerJobPostingReducer";
import { employerJobsReducer } from "./Reducers/EmployerJobsReducer";
import { employerDetailsReducer } from "./Reducers/EmployerDetailsReducer";
import { messageReducer } from "./Reducers/MessageReducer";
import { companySalaryReducer } from "./Reducers/CompanySalaryReducer";
import { employerReviewReducer } from "./Reducers/EmployerReviewReducer";
import { userJobReducer } from "./Reducers/UserJobReducer";
import { employerReportReducer } from "./Reducers/EmployerReportReducer";

const appReducer = combineReducers({
  signup: signUpReducer,
  login: loginReducer,
  jobs: jobReducer,
  companyReview: companyReviewReducer,
  companyDetails: CompanyDetailsReducer,
  companyReviewList: CompanyListReviewReducer,
  TopReviewedCompanies: TopCompanyListReviewReducer,
  TopRatingCompanies: TopCompanyListRatingReducer,
  TopAcceptedJobseekers: TopAcceptedJobSeekerReducer,
  employerJobPosting: employerJobPostingReducer,
  employerJobs: employerJobsReducer,
  employerDetails: employerDetailsReducer,
  employerReview: employerReviewReducer,
  AdminAllReviews: getAllReviewsReducer,
  TopRatedCeos: getTopRatedCeosReducer,
  AdminListAllCompanies: getAllCompaniesReducer,
  UpdateReviewStatus: UpdateReviewStatusReducer,
  messages: messageReducer,
  UpdateHelpfulCount: UpdateHelpfulCountReducer,
  updatePhotoStatus: updatePhotoStatusReducer,
  jobApplicants: jobApplicantsReducer,
  salary: companySalaryReducer,
  featuredReviews:getFeaturedReviewsReducer,
  updateViewCount: updateViewCountReducer,
  getTopViewCount: getTopViewCountReducer,
  userjob: userJobReducer,
  employerReport: employerReportReducer,
  updateJobApplication:updateApplicationReducer
});

// const rootReducer = (state, action) => {
//   //   if (action.type === JOBSEEKER_LOGOUT) {
//   //     /state = undefined;
//   //   }
//   return appReducer(state, action);
// };

const customerSignInfoFromStorage = localStorage.getItem("login")
  ? JSON.parse(localStorage.getItem("login"))
  : {
      isAuth: false,
      userDetails: {},
      errorResponse: null,
      accErr: false,
    };

const initialState = {
  login: customerSignInfoFromStorage,
};
const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  appReducer,
  initialState,
  createComposer(applyMiddleware(thunk))
);
