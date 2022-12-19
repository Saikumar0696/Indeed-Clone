/* eslint-disable default-case */
import Review from "../../components/Company/Company";
import {
  COMPANY_LIST_SUCCESS,
  COMPANY_LIST_FAIL,
  COMPANY_LIST_REVIEWS_SUCCESS,
  COMPANY_LIST_REVIEWS_FAIL,
  UPDATE_REVIEW_STATUS_SUCCESS,
  UPDATE_REVIEW_STATUS_FAIL,
  UPDATE_HELPFUL_COUNT_SUCCESS,
  UPDATE_HELPFUL_COUNT_FAIL,
  COMPANY_LIST_FEATURE_REVIEWS_SUCCESS,
  COMPANY_LIST_FEATURE_REVIEWS_FAIL,
} from "../Constants/Company";

const initialState = {
  responseFromServer: null,
  errorResponse: null,
};

export const CompanyDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPANY_LIST_SUCCESS:
      return {
        ...state,
        responseFromServer: action.payload,
      };
    case COMPANY_LIST_FAIL:
      return {
        ...state,
        errorResponse: action.payload,
      };
    default:
      return { ...state };
  }
};
const initialState1 = {
  companySpecificReviews: [],
  companySpecificReviewsError: null,
};

export const CompanyListReviewReducer = (state = initialState1, action) => {
  switch (action.type) {
    case COMPANY_LIST_REVIEWS_SUCCESS:
      return {
        ...state,
        companySpecificReviews: action.payload,
      };

    case COMPANY_LIST_REVIEWS_FAIL:
      return {
        ...state,
        companySpecificReviewsError: action.payload,
      };
    default:
      return { ...state };
  }
};

const initialState2 = {
  updateReviewStatus: null,
  updateReviewStatusError: null,
};
export const UpdateReviewStatusReducer = (state = initialState2, action) => {
  switch (action.type) {
    case UPDATE_REVIEW_STATUS_SUCCESS:
      return {
        ...state,
        updateReviewStatus: action.payload,
      };
    case UPDATE_REVIEW_STATUS_FAIL:
      return {
        ...state,
        updateReviewStatusError: action.payload,
      };
    default:
      return { ...state };
  }
};

const initialState3 = {
  updateHelpfulCount: null,
  updateHelpfulCountError: null,
};
export const UpdateHelpfulCountReducer = (state = initialState3, action) => {
  switch (action.type) {
    case UPDATE_HELPFUL_COUNT_SUCCESS:
      return {
        ...state,
        updateHelpfulCount: action.payload,
      };
    case UPDATE_HELPFUL_COUNT_FAIL:
      return {
        ...state,
        updateHelpfulCountError: action.payload,
      };
    default:
      return { ...state };
  }
};


const initialState4 = {
  FeaturedReview: null,
  getFeaturedReviewsError: null,
};

export const getFeaturedReviewsReducer = (state = initialState4, action) => {
  switch (action.type) {
    case COMPANY_LIST_FEATURE_REVIEWS_SUCCESS:
      return {
        ...state,
        FeaturedReview: action.payload,
      };
    case COMPANY_LIST_FEATURE_REVIEWS_FAIL:
      return {
        ...state,
        getFeaturedReviewsError: action.payload,
      };
    default:
      return { ...state };
  }
};
