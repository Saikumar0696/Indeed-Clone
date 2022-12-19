import {
    FETCH_ALL_JOBS,
    FETCH_QUERIED_JOBS,
    FETCH_Q_JOBS,
    JOB_ERROR,
    JOB_APPLY_ERROR,
    POST_SAVED_JOBS,
    DELETE_SAVED_JOBS,
    GET_SAVED_JOBS,
    GET_APPLIED_JOBS,
    GET_USER_REVIEWS,
    UPDATE_USER_PROFILE,
    REVIEW_ERROR,
    APPLY_JOB,
    USER_PROFILE,
    USER_ERROR
} from '../Constants/UserConstants';
import {
    GET_JOB_APPLICANTS_REQUEST,
    GET_JOB_APPLICANTS_SUCCESS,
    GET_JOB_APPLICANTS_FAIL,
    UPDATE_APPLICATION_STATUS_SUCCESS,
    UPDATE_APPLICATION_STATUS_REQUEST,
    UPDATE_APPLICATION_STATUS_FAIL
} from '../Constants/JobConstants';
import Axios from 'axios'; 
import { API } from '../../config';

export const fetchAllJobs = (data) => (dispatch) => {
    Axios.get(`${API}/users/public/jobs`,{
        params:data
    })
    .then((response) => {
        dispatch({
            type : FETCH_ALL_JOBS,
            payload : response.data 
        })
    })
    .catch(error => {
        dispatch({
            type: JOB_ERROR,
            payload: error
        })
    }); 
}

export const fetchQueriedJobs = (data) => (dispatch) => {
    Axios.get(`${API}/users/public/jobs`,{
        params:data
    })
    .then((response) => {
        dispatch({
            type : FETCH_QUERIED_JOBS,
            payload : response.data 
        })
    })
    .catch(error => {
        dispatch({
            type: JOB_ERROR,
            payload: error
        })
    });
}


export const fetchQJobs = (data) => (dispatch) => {
    Axios.get(`${API}/users/public/jobs`,{
        params:data
    })
    .then((response) => {
        dispatch({
            type : FETCH_Q_JOBS,
            payload : response.data 
        })
    })
    .catch(error => {
        dispatch({
            type: JOB_ERROR,
            payload: error
        })
    });
}

export const postSavedJobs = (data) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    Axios.post(`${API}/users/saved-jobs`, data, config)
    .then((response) => {
        dispatch({
            type: POST_SAVED_JOBS,
            payload: response.data
        })
    })
    .catch((error) => {
        dispatch({
            type: JOB_ERROR,
            payload: error
        })
    })
}

export const deleteSavedJobs = (data) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    Axios.delete(`${API}/users/saved-jobs`, {data : data}, config)
    .then((response) => {
        dispatch({
            type: DELETE_SAVED_JOBS,
            payload: response.data
        })
    })
    .catch((error) => {
        dispatch({
            type: JOB_ERROR,
            payload: error
        })
    })
}

export const getSavedJobs = (data) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    Axios.get(`${API}/users/saved-jobs`, {
        params:data
    }, config)
    .then((response) => {
        dispatch({
            type: GET_SAVED_JOBS,
            payload: response.data
        })
    })
    .catch((error) => {
        dispatch({
            type: JOB_ERROR,
            payload: error
        })
    })
}

export const getAppliedJobs = (data) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    Axios.get(`${API}/users/applied-jobs`, {
        params:data
    }, config)
    .then((response) => {
        dispatch({
            type: GET_APPLIED_JOBS,
            payload: response.data
        })
    })
    .catch((error) => {
        dispatch({
            type: JOB_ERROR,
            payload: error
        })
    })
}

export const getUserReviews = (data) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    Axios.get(`${API}/users/reviews`, {
        params:data
    }, config)
    .then((response) => {
        dispatch({
            type: GET_USER_REVIEWS,
            payload: response.data
        })
    })
    .catch((error) => {
        dispatch({
            type: REVIEW_ERROR,
            payload: error
        })
    })
}

export const getUserProfile = (data) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    Axios.get(`${API}/users/profile`, {
        params:data
    }, config)
    .then((response) => {
        dispatch({
            type: USER_PROFILE,
            payload: response.data
        })
    })
    .catch((error) => {
        dispatch({
            type: USER_ERROR,
            payload: error
        })
    })
}

export const updateUserProfile = (data) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    Axios.post(`${API}/users/profile`, data, config)
    .then((response) => {
        dispatch({
            type: UPDATE_USER_PROFILE,
            payload: response.data
        })
    })
    .catch((error) => {
        dispatch({
            type: USER_ERROR,
            payload: error
        })
    })
}

export const applyJobs = (data) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    Axios.post(`${API}/users/apply-job`, data, config)
    .then((response) => {
        dispatch({
            type: APPLY_JOB,
            payload: response.data
        })
    })
    .catch((error) => {
        dispatch({
            type: JOB_APPLY_ERROR,
            payload: error
        })
    })
}

export const getJobApplicants = (jobId, employerId) => async(dispatch) => {
    try{
        dispatch({
            type: GET_JOB_APPLICANTS_REQUEST
        })
        const { data } = await Axios.get(`${API}/employer/job-applicants/${jobId}&${employerId}`)
        dispatch({
            type: GET_JOB_APPLICANTS_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: GET_JOB_APPLICANTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateJobApplicationStatus = (userId, jobId, employerId, status) => async(dispatch) => {

    try{
        dispatch({
            type: UPDATE_APPLICATION_STATUS_REQUEST
        })
        const { data } = await Axios.put(`${API}/employer/update-application`, {userId, jobId, employerId, status})
        dispatch({
            type: UPDATE_APPLICATION_STATUS_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: UPDATE_APPLICATION_STATUS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

