import {
  EMPLOYER_REVIEW_UPDATE,
  EMPLOYER_REVIEW_UPDATE_ERROR,
} from "../Constants/UserConstants";

import Axios from "axios";
import { API } from "../../config";

export const employerReviewUpdate = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log("Review Update data ", data);
  Axios.post(`${API}/employer/reviewupdate`, data, config)
    .then((response) => {
      dispatch({
        type: EMPLOYER_REVIEW_UPDATE,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log("Error from backend", error);
      dispatch({
        type: EMPLOYER_REVIEW_UPDATE_ERROR,
        payload: error,
      });
    });
};
