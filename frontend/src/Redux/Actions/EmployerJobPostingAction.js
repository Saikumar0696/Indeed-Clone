import {
  EMPLOYER_JOB_POST,
  EMPLOYER_JOB_ERROR,
  EMPLOYER_ALL_JOBS,
  EMPLOYER_ALL_JOBS_ERROR,
} from "../Constants/UserConstants";

import Axios from "axios";
import { API } from "../../config";

export const employerJobPost = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // const newdata = { ...data, employerID: "61a07e89e5d016c47d56338a" };
  // console.log("Request data before job post call ", data);
  Axios.post(`${API}/employer/post-job`, data, config)
    .then((response) => {
      dispatch({
        type: EMPLOYER_JOB_POST,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log("Error from backend", error);
      dispatch({
        type: EMPLOYER_JOB_ERROR,
        payload: error,
      });
    });
};

export const employerAllJob = (employerID) => (dispatch) => {
  // const { employerID } = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // const newdata = { ...data, employerID: "61a07e89e5d016c47d56338a" };
  console.log("data", employerID);
  Axios.get(`${API}/employer/jobs-posted/${employerID}`, config)
    .then((response) => {
      dispatch({
        type: EMPLOYER_ALL_JOBS,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log("Error from backend", error);
      dispatch({
        type: EMPLOYER_ALL_JOBS_ERROR,
        payload: error,
      });
    });
};
