import {
  EMPLOYER_PIE_REPORTS,
  EMPLOYER_PIE_REPORTS_ERROR,
  EMPLOYER_BAR_REPORTS,
  EMPLOYER_BAR_REPORTS_ERROR,
} from "../Constants/UserConstants";

import Axios from "axios";
import { API } from "../../config";

export const employerPieReports = (employerId, date) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  Axios.get(
    `${API}/employer/jobapplications/aggregate/${employerId}/${date}`,

    config
  )
    .then((response) => {
      dispatch({
        type: EMPLOYER_PIE_REPORTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: EMPLOYER_PIE_REPORTS_ERROR,
        payload: error,
      });
    });
};

export const employerBarReports = (employerId, date) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  Axios.get(
    `${API}/employer/eachjobapplications/aggregate/${employerId}/${date}`,

    config
  )
    .then((response) => {
      dispatch({
        type: EMPLOYER_BAR_REPORTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: EMPLOYER_BAR_REPORTS_ERROR,
        payload: error,
      });
    });
};
