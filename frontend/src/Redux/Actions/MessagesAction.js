import {
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAIL,
    GET_DISTINCT_EMPLOYERS,
    GET_MSGS_JOBSEEKERS,
    REPLY_MESSAGE_SUCCESS,
    MESSAGE_ERROR
} from "../Constants/MessageConstants";
import Axios from 'axios';
import { API } from "../../config";

export const sendMessageAction = (data) => async(dispatch) => {
     Axios.post(`${API}/messages/send-message`, data)
     .then(response => {
        dispatch({
            type : SEND_MESSAGE_SUCCESS,
            payload : response.data 
        })
    })
    .catch(error => {
        dispatch({
            type: SEND_MESSAGE_FAIL,
            payload: error
        })
    });
}

export const replyMessageAction = (data) => async(dispatch) => {
    Axios.put(`${API}/messages/reply-message`, data)
    .then(response => {
       dispatch({
           type : REPLY_MESSAGE_SUCCESS,
           payload : response.data 
       })
   })
   .catch(error => {
       dispatch({
           type: MESSAGE_ERROR,
           payload: error
       })
   });
}

export const getDistinctEmployer = (data) => (dispatch) => {
    Axios.get(`${API}/messages/distinct-employers/`,{
        params: data
    }).then(response => {
        dispatch({
            type : GET_DISTINCT_EMPLOYERS,
            payload : response.data 
        })
    })
    .catch(error => {
        dispatch({
            type: MESSAGE_ERROR,
            payload: error
        })
    });
}

export const getMessages = (data) => (dispatch) => {
    Axios.get(`${API}/messages/conversation`,{
        params: data
    }).then(response => {
        dispatch({
            type : GET_MSGS_JOBSEEKERS,
            payload : response.data 
        })
    })
    .catch(error => {
        dispatch({
            type: MESSAGE_ERROR,
            payload: error
        })
    });
}