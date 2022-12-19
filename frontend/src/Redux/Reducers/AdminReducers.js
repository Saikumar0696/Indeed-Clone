/* eslint-disable default-case */
import {
    ADMIN_TOP_MOST_REVIEWED_SUCCESS,
    ADMIN_TOP_MOST_REVIEWED_FAIL,
    ADMIN_TOP_MOST_RATING_SUCCESS,
    ADMIN_TOP_MOST_RATING_FAIL,
    ADMIN_TOP_MOST_JOBSEEKER_SUCCESS,
    ADMIN_TOP_MOST_JOBSEEKER_FAIL,
    ADMIN_GET_ALL_REVIEWS_SUCCESS,
    ADMIN_GET_ALL_REVIEWS_FAIL,
    ADMIN_TOP_MOST_CEOS_SUCCESS,
    ADMIN_TOP_MOST_CEOS_FAIL,
    ADMIN_LIST_ALL_COMPANIES_SUCCESS,
    ADMIN_LIST_ALL_COMPANIES_FAIL,
    ADMIN_UPDATE_PHOTO_STATUS_SUCCESS,
    ADMIN_UPDATE_PHOTO_STATUS_FAIL,
    ADMIN_UPDATE_VIEW_COUNT_SUCCESS,
    ADMIN_UPDATE_VIEW_COUNT_FAIL,
    ADMIN_GET_TOP_VIEW_COUNT_SUCCESS,
    ADMIN_GET_TOP_VIEW_COUNT_FAIL,

  } from '../Constants/AdminConstants';

const initialState = {
  topCompanyReviewes: null,
  topCompanyReviewesError: null
}

export const TopCompanyListReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_TOP_MOST_REVIEWED_SUCCESS:
        return { 
            ...state,
            topCompanyReviewes: action.payload, 
            };
    case ADMIN_TOP_MOST_REVIEWED_FAIL:
        return {
            ...state,
            topCompanyReviewesError: action.payload
          };
    default:
      return { ...state };
  }
};

const initialState1 = {
    topCompanyRatings: null,
    topCompanyRatingsError: null
  }

  export const TopCompanyListRatingReducer = (state = initialState1, action) => {
    switch (action.type) {
      case ADMIN_TOP_MOST_RATING_SUCCESS:
          return { 
              ...state,
              topCompanyRatings: action.payload, 
              };
      case ADMIN_TOP_MOST_RATING_FAIL:
          return {
              ...state,
              topCompanyRatingsError: action.payload
            };
      default:
        return { ...state };
    }
  };
  const initialState2 = {
    topAcceptedJobseeker: null,
    topAcceptedJobseekerError: null
  }

  export const TopAcceptedJobSeekerReducer = (state = initialState2, action) => {
    switch (action.type) {
      case ADMIN_TOP_MOST_JOBSEEKER_SUCCESS:
          return { 
              ...state,
              topAcceptedJobseeker: action.payload, 
              };
      case ADMIN_TOP_MOST_JOBSEEKER_FAIL:
          return {
              ...state,
              topAcceptedJobseekerError: action.payload
            };
      default:
        return { ...state };
    }
  };


  const initialState3 = {
    AllReviews: null,
    AllReviewsError: null
  }

  export const getAllReviewsReducer = (state = initialState3, action) => {
    switch (action.type) {
      case ADMIN_GET_ALL_REVIEWS_SUCCESS:
          return { 
              ...state,
              AllReviews: action.payload, 
              };
      case ADMIN_GET_ALL_REVIEWS_FAIL:
          return {
              ...state,
              AllReviewsError: action.payload
            };
      default:
        return { ...state };
    }
  };


  const initialState4 = {
    TopRatedCeos: null,
    TopRatedCeosError: null
  }

  export const getTopRatedCeosReducer = (state = initialState4 , action) => {
    switch (action.type) {
      case ADMIN_TOP_MOST_CEOS_SUCCESS:
          return { 
              ...state,
              TopRatedCeos: action.payload, 
              };
      case ADMIN_TOP_MOST_CEOS_FAIL:
          return {
              ...state,
              TopRatedCeosError: action.payload
            };
      default:
        return { ...state };
    }
  };


  const initialState5 = {
    ListAllCompanies: null,
    ListAllCompaniesError: null
  }

  export const getAllCompaniesReducer = (state = initialState5 , action) => {
    switch (action.type) {
      case ADMIN_LIST_ALL_COMPANIES_SUCCESS:
          return { 
              ...state,
              ListAllCompanies: action.payload, 
              };
      case ADMIN_LIST_ALL_COMPANIES_FAIL:
          return {
              ...state,
              ListAllCompaniesError: action.payload
            };
      default:
        return { ...state };
    }
  };

  const initialState6 = {
    updatePhotoStatus: null,
    updatePhotoStatusError: null
  }

  export const updatePhotoStatusReducer = (state = initialState6 , action) => {
    switch (action.type) {
      case ADMIN_UPDATE_PHOTO_STATUS_SUCCESS:
          return { 
              ...state,
              updatePhotoStatus: action.payload, 
              };
      case ADMIN_UPDATE_PHOTO_STATUS_FAIL:
          return {
              ...state,
              updatePhotoStatusError: action.payload
            };
      default:
        return { ...state };
    }
  };


  const initialState7 = {
    updateViewCount: null,
    updateViewCountError: null
  }

  export const updateViewCountReducer = (state = initialState7 , action) => {
    switch (action.type) {
      case ADMIN_UPDATE_VIEW_COUNT_SUCCESS:
          return { 
              ...state,
              updateViewCount: action.payload, 
              };
      case ADMIN_UPDATE_VIEW_COUNT_FAIL:
          return {
              ...state,
              updateViewCountError: action.payload
            };
      default:
        return { ...state };
    }
  };

  const initialState8 = {
    topViewCounts: null,
    topViewCountsError: null
  }

  export const getTopViewCountReducer = (state = initialState8 , action) => {
    switch (action.type) {
      case ADMIN_GET_TOP_VIEW_COUNT_SUCCESS:
          return { 
              ...state,
              topViewCounts: action.payload, 
              };
      case ADMIN_GET_TOP_VIEW_COUNT_FAIL:
          return {
              ...state,
              topViewCountsError: action.payload
            };
      default:
        return { ...state };
    }
  };