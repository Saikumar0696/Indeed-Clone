import {
  FETCH_COMPANY_SUCCESS,
  FETCH_COMPANY_FAILURE,
} from "../Constants/CompanyReviewConstants";
import Axios from "axios";
import { API } from "../../config";

export const getCompanyReviews = (companyName, location) => (dispatch) => {
  Axios.get(
    `${API}/company/companyreviews?location=${location}&company=${companyName}`
  )
    .then((response) => {
      dispatch({
        type: FETCH_COMPANY_SUCCESS,
        payload: response.data,
      });
      console.log(response.data);
    })
    .catch((error) => {
      dispatch({
        type: FETCH_COMPANY_FAILURE,
        payload: error,
      });
    });
};
