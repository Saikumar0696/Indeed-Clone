import axios from "axios";
import { API } from "../../config";

export const getCompanySalaries = () => (dispatch) => {
  axios
    .get(`${API}/company/user-salary`)
    .then((response) => {
      dispatch({
        type: "FETCH_COMPANY_SALARY_SUCCESS",
        payload: response.data,
      });
      console.log(response.data);
    })
    .catch((error) => {
      dispatch({
        type: "FETCH_COMPANY_SALARY_FAILURE",
        payload: error,
      });
    });
};
