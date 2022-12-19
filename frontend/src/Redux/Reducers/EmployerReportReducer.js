import {
  EMPLOYER_PIE_REPORTS,
  EMPLOYER_PIE_REPORTS_ERROR,
  EMPLOYER_BAR_REPORTS,
  EMPLOYER_BAR_REPORTS_ERROR,
} from "../Constants/UserConstants";

const initialState = {
  responseFromServerPie: null,
  errorResponsePie: null,
  responseFromServerBar: null,
  errorResponseBar: null,
};

export const employerReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYER_PIE_REPORTS:
      return {
        ...state,
        responseFromServerPie: action.payload,
      };
    case EMPLOYER_PIE_REPORTS_ERROR:
      return {
        ...state,
        errorResponsePie: action.payload,
      };
    case EMPLOYER_BAR_REPORTS:
      return {
        ...state,
        responseFromServerBar: action.payload,
      };
    case EMPLOYER_BAR_REPORTS_ERROR:
      return {
        ...state,
        errorResponseBar: action.payload,
      };
    default:
      return state;
  }
};
