import { 
    ALLUSER_SIGNUP,
    SIGNUP_ERROR
  } from '../Constants/UserConstants';
import Axios from 'axios'; 
import { API } from '../../config';

export const signUpError = (data) => {
    return {
        type: SIGNUP_ERROR,
        payload: data
    }
}

export const signUpUser = (data) => {
    return {
        type: ALLUSER_SIGNUP,
        payload: data
    }
}

export const allUsersSignUp = (data) => (dispatch) => {
    Axios.post(`${API}/users/public/signup`, data)
    .then((response) => {
        dispatch(signUpUser(response.data))
    })
    .catch(error => {
        dispatch(signUpError("User already exists"))
    });
}