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

  import Axios from 'axios'; 
  import { API } from '../../config';

  export const getTopReviewedCompanies = (data) => (dispatch) => {
   
  Axios.get(`${API}/admin/get-top-reviewedcomapnies`)
  .then((response) => {
      dispatch({
          type : ADMIN_TOP_MOST_REVIEWED_SUCCESS,
          payload : response.data 
      })
  })
  .catch(error => {
      dispatch({
          type: ADMIN_TOP_MOST_REVIEWED_FAIL,
          payload: error
      })
  });
  
  }
  export const getTopRatedCompanies = (data) => (dispatch) => {
   
    Axios.get(`${API}/admin/get-top-ratedcomapnies`)
    .then((response) => {
        dispatch({
            type : ADMIN_TOP_MOST_RATING_SUCCESS,
            payload : response.data 
        })
    })
    .catch(error => {
        dispatch({
            type: ADMIN_TOP_MOST_RATING_FAIL,
            payload: error
        })
    });
    
    }
    export const getTopAcceptedJobseekers = (data) => (dispatch) => {
   
        Axios.get(`${API}/admin/get-top-acceptedreview-users`)
        .then((response) => {
            dispatch({
                type : ADMIN_TOP_MOST_JOBSEEKER_SUCCESS,
                payload : response.data 
            })
        })
        .catch(error => {
            dispatch({
                type: ADMIN_TOP_MOST_JOBSEEKER_FAIL,
                payload: error
            })
        });
        
        }

        export const getTopRatedCeos = (data) => (dispatch) => {
   
            Axios.get(`${API}/admin/get-top-rated-ceos`)
            .then((response) => {
                dispatch({
                    type : ADMIN_TOP_MOST_CEOS_SUCCESS,
                    payload : response.data 
                })
            })
            .catch(error => {
                dispatch({
                    type: ADMIN_TOP_MOST_CEOS_FAIL,
                    payload: error
                })
            });
            
            }


            export const getAllReviews = (data) => (dispatch) => {
   
                Axios.get(`${API}/company/reviews`)
                .then((response) => {
                    dispatch({
                        type : ADMIN_GET_ALL_REVIEWS_SUCCESS,
                        payload : response.data 
                    })
                })
                .catch(error => {
                    dispatch({
                        type: ADMIN_GET_ALL_REVIEWS_FAIL,
                        payload: error
                    })
                });
                
                }

                export const getAllCompanies = (data) => (dispatch) => {
   
                    Axios.get(`${API}/admin/get-all-companies`)
                    .then((response) => {
                        dispatch({
                            type : ADMIN_LIST_ALL_COMPANIES_SUCCESS,
                            payload : response.data 
                        })
                    })
                    .catch(error => {
                        dispatch({
                            type: ADMIN_LIST_ALL_COMPANIES_FAIL,
                            payload: error
                        })
                    });
                    
                    }

                    export const updatePhotoStatus = (data) => (dispatch) => {
   
                        Axios.put(`${API}/company/update-photo-status?employerId=${data.employerId}&photoId=${data.photoId}`)
                        .then((response) => {
                            dispatch({
                                type : ADMIN_UPDATE_PHOTO_STATUS_SUCCESS,
                                payload : response.data 
                            })
                        })
                        .catch(error => {
                            dispatch({
                                type: ADMIN_UPDATE_PHOTO_STATUS_FAIL,
                                payload: error
                            })
                        });
                        
                        }

                            export const getTopViewCount= (data) => (dispatch) => {
                                const config = {
                                    headers: {
                                      'content-type': 'application/x-www-form-urlencoded',
                                      Accept: 'application/json'
                                    },
                                  }
                                Axios.get(`${API}/admin/getTopViewCountsByDay/${data.day}`, 
                              config)
                                .then((response) => {
                                    dispatch({
                                        type :ADMIN_GET_TOP_VIEW_COUNT_SUCCESS,
                                        payload : response.data 
                                    })
                                })
                                .catch(error => {
                                    dispatch({
                                        type: ADMIN_GET_TOP_VIEW_COUNT_FAIL,
                                        payload: error
                                    })
                                });
                            }
                           
                            export const updateViewCount = (data) => (dispatch) => {
   
                                Axios.get(`${API}/admin/addViewCount/${data.employerId}`)
                                .then((response) => {
                                    dispatch({
                                        type : ADMIN_UPDATE_VIEW_COUNT_SUCCESS,
                                        payload : response.data 
                                    })
                                })
                                .catch(error => {
                                    dispatch({
                                        type: ADMIN_UPDATE_VIEW_COUNT_FAIL,
                                        payload: error
                                    })
                                });
                                
                                }