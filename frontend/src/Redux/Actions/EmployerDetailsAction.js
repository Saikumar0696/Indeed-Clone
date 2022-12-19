import {
  EMPLOYER_DETAILS_ADD,
  EMPLOYER_DETAILS_ERROR,
  EMPLOYER_DETAILS_GET_ERROR,
  EMPLOYER_DETAILS_GET,
} from "../Constants/UserConstants";

import Axios from "axios";
import { API } from "../../config";

export const employerDetailsAdd = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log("data", data);
  Axios.post(`${API}/employer/updateemployer`, data, config)
    .then((response) => {
      dispatch({
        type: EMPLOYER_DETAILS_ADD,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log("Error from backend", error);
      dispatch({
        type: EMPLOYER_DETAILS_ERROR,
        payload: error,
      });
    });
};

export const employerDetailsGet = (employerID) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  Axios.get(`${API}/employer/employerdetails/${employerID}`, config)
    // Axios.get(`${API}/employer/employerdetails/12`, config)
    .then((response) => {
      dispatch({
        type: EMPLOYER_DETAILS_GET,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log("Error from backend", error);
      dispatch({
        type: EMPLOYER_DETAILS_GET_ERROR,
        payload: error,
      });
    });
};

// export const getEmployerCompanyDetails = (data) => (dispatch) => {
//   const config = {
//       headers: {
//         'content-type': 'application/x-www-form-urlencoded',
//         Accept: 'application/json'
//       },
//     }
//   Axios.get(`${API}/employer/home`,
//   {
//   params: data
// },
// config)
//   .then((response) => {
//       dispatch({
//           type : COMPANY_LIST_SUCCESS,
//           payload : response.data
//       })
//   })
//   .catch(error => {
//       dispatch({
//           type: COMPANY_LIST_FAIL,
//           payload: error
//       })
//   });
// }
