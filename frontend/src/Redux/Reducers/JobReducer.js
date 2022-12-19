import {
    FETCH_ALL_JOBS,
    FETCH_QUERIED_JOBS,
    FETCH_Q_JOBS,
    JOB_ERROR,
    POST_SAVED_JOBS,
    DELETE_SAVED_JOBS,
    GET_SAVED_JOBS,
    GET_USER_REVIEWS,
    REVIEW_ERROR,
    APPLY_JOB,
    JOB_APPLY_ERROR,
    USER_PROFILE,
    USER_ERROR,
    GET_APPLIED_JOBS,
    UPDATE_USER_PROFILE
} from '../Constants/UserConstants';

import { GET_JOB_APPLICANTS_REQUEST, GET_JOB_APPLICANTS_SUCCESS, GET_JOB_APPLICANTS_RESET, GET_JOB_APPLICANTS_FAIL, UPDATE_APPLICATION_STATUS_REQUEST, UPDATE_APPLICATION_STATUS_FAIL, UPDATE_APPLICATION_STATUS_SUCCESS } from '../Constants/JobConstants';
  
const initialState = {
    allJobs: null,
    successResponse: null, 
    errorResponse: null,
    queriedJobs: null,
    savedJobs: null,
    appliedJobs: null,
    reviews: null,
    queriedJobsLength: 0,
    profile: null,
    isApplied: false,
    jobResponse: false
} 
  
export const jobReducer = (state = initialState, action) => {
      switch (action.type) {
        case FETCH_ALL_JOBS:
          return { 
            ...state,
            allJobs: action.payload,
            isApplied: false
          };
        case FETCH_QUERIED_JOBS:
          return { 
            ...state,
            queriedJobs: action.payload,
            isApplied: false
          };
        case FETCH_Q_JOBS:
          return {
            ...state, 
            queriedJobsLength: action.payload.length
          }
        case GET_USER_REVIEWS: {
          return {
            ...state,
            reviews: action.payload
          }
        }
        case USER_PROFILE: {
          return {
            ...state,
            profile: action.payload
          }
        }
        case UPDATE_USER_PROFILE:
          return {
            ...state,
            profile: action.payload
          }
        case USER_ERROR:
          return {
            ...state,
            errorResponse: action.payload
          }
        case REVIEW_ERROR:
          return {
            ...state,
            errorResponse: action.payload
          }
        case POST_SAVED_JOBS:
          return {
            ...state,
            successResponse: action.payload
          }
        case GET_SAVED_JOBS:
          return {
            ...state,
            savedJobs: action.payload
          }
        case GET_APPLIED_JOBS:
          return {
            ...state,
            appliedJobs: action.payload
          }
        case DELETE_SAVED_JOBS:
          return {
            ...state,
            successResponse: action.payload
          }
        case APPLY_JOB:
          return {
            ...state,
            successResponse: action.payload,
            jobResponse: true
          }
        case JOB_APPLY_ERROR:
          return {
            ...state,
            isApplied: true
          }
        case JOB_ERROR:
          return {
            ...state,
            errorResponse: action.payload
          }
        default:
          return state;
      }
    };

export const jobApplicantsReducer = (state = {applicants: []}, action) => {

    switch(action.type){
        case GET_JOB_APPLICANTS_REQUEST:
            return { applicants: []}
        case GET_JOB_APPLICANTS_SUCCESS:
            return { applicants: action.payload }
        case GET_JOB_APPLICANTS_FAIL:
            return { error: action.payload }
        case GET_JOB_APPLICANTS_RESET:
            return { applicants: [] }
        default:
            return state
    }
}

export const updateApplicationReducer = (state = {applicant: {}}, action) => {

    switch(action.type){
        case UPDATE_APPLICATION_STATUS_REQUEST:
            return { applicant: {}}
        case UPDATE_APPLICATION_STATUS_SUCCESS:
            console.log(action.payload)
            return { success: true,  applicant: action.payload }
        case UPDATE_APPLICATION_STATUS_FAIL:
            return { success: false, error: action.payload }
        default:
            return state
    }
}