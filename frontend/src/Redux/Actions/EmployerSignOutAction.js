import { EMPLOYER_LOGOUT } from "../Constants/UserConstants";

export const employerLogout = () => (dispatch) => {
  dispatch({
    type: EMPLOYER_LOGOUT,
  });
};
