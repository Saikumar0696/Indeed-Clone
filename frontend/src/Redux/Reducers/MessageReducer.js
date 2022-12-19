import {
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAIL,
    GET_USER_MESSAGES_REQUEST,
    GET_USER_MESSAGES_SUCCESS,
    GET_USER_MESSAGES_FAIL,
    GET_EMPLOYER_MESSAGES_REQUEST,
    GET_EMPLOYER_MESSAGES_SUCCESS,
    GET_EMPLOYER_MESSAGES_FAIL,
    SEND_MESSAGE_RESET,
    GET_DISTINCT_EMPLOYERS,
    GET_MSGS_JOBSEEKERS,
    REPLY_MESSAGE_SUCCESS,
    MESSAGE_ERROR
} from '../Constants/MessageConstants';

const initialState = {
    employerDetails: null,
    errorResponse: null,
    conversation: null,
    successResponse: null
} 
  
export const messageReducer = (state = initialState, action) => {
      switch (action.type) {
        case GET_DISTINCT_EMPLOYERS:
          return { 
                ...state,
                employerDetails: action.payload  
            };
        case GET_MSGS_JOBSEEKERS:
            return {
                ...state,
                conversation: action.payload
            }
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                successResponse: action.payload
            }
        case REPLY_MESSAGE_SUCCESS:
            return {
                ...state,
                successResponse: action.payload
            }
        case SEND_MESSAGE_FAIL:
            return {
                ...state,
                errorResponse: action.payload
            };
        case MESSAGE_ERROR:
            return {
                ...state,
                errorResponse: action.payload
            };
        default:
            return state;
            }
    }
export const sendMessageReducer = (state= {}, action) => {

    switch(action.type){
        case SEND_MESSAGE_REQUEST:
            return { loading: true }
        case SEND_MESSAGE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case SEND_MESSAGE_FAIL:
            return { loading: false, error: action.payload }
        case SEND_MESSAGE_RESET:
            return {}
        default:
            return state
    }
}

export const getUserMessagesReducer = (state = { userMessages: []}, action) => {

    switch (action.type){
        case GET_USER_MESSAGES_REQUEST:
            return { loading: true }
        case GET_USER_MESSAGES_SUCCESS:
            return { loading: false, userMessages: action.payload }
        case GET_USER_MESSAGES_FAIL:
            return { loading: false, error: action.payload }
    }
}