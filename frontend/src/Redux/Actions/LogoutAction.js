import { 
    JOBSEEKER_LOGOUT
  } from '../Constants/UserConstants';
import Axios from 'axios'; 
import { API } from '../../config';


export const jobSeekerLogout = () => (dispatch) => {
    dispatch({
        type : JOBSEEKER_LOGOUT 
    })
}