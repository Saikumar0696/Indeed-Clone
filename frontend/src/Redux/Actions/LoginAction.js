import { 
    ALLUSER_LOGIN,
    LOGIN_ERROR
  } from '../Constants/UserConstants';
import Axios from 'axios'; 
import { API } from '../../config';

export const loginError = (data) => {
    return {
        type: LOGIN_ERROR,
        payload: data
    }
}

export const loginUser = (data) => {
    return {
        type: ALLUSER_LOGIN,
        payload: data
    }
}

export const jobSeekerLogin = (data) => (dispatch) => {
    Axios.post(`${API}/users/public/login`, data)
    .then((response) => {
        dispatch(loginUser(response.data))
    })
    .catch(error => {
        dispatch(loginError("Account not found or Invalid credentials"))
    });
}
