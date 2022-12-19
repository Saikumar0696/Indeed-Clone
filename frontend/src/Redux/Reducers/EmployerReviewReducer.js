import {
  EMPLOYER_REVIEW_UPDATE,
  EMPLOYER_REVIEW_UPDATE_ERROR,
} from "../Constants/UserConstants";

const initialState = {
  errorResponse: null,
  responseFromServer: null,
};

export const employerReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYER_REVIEW_UPDATE:
      return {
        ...state,
        responseFromServer: action.payload,
      };
    case EMPLOYER_REVIEW_UPDATE_ERROR:
      return {
        ...state,
        errorResponse: action.payload,
      };
    default:
      return state;
  }
};
