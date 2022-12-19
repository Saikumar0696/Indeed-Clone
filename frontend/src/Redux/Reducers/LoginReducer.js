import {
  ALLUSER_LOGIN,
  LOGIN_ERROR,
  JOBSEEKER_LOGOUT,
  EMPLOYER_LOGOUT,
} from "../Constants/UserConstants";

const initialState = {
  isAuth: false,
  userDetails: {},
  errorResponse: null,
  accErr: false,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALLUSER_LOGIN:
      localStorage.setItem(
        "login",
        JSON.stringify({ ...state, isAuth: true, userDetails: action.payload })
      );
      return {
        ...state,
        isAuth: true,
        userDetails: action.payload,
      };
    case LOGIN_ERROR:
      localStorage.setItem(
        "login",
        JSON.stringify({
          ...state,
          accErr: true,
          errorResponse: action.payload,
        })
      );
      return {
        ...state,
        accErr: true,
        errorResponse: action.payload,
      };
    case JOBSEEKER_LOGOUT:
      localStorage.removeItem("login");

      return {
        ...state,
        userDetails: {},
        isAuth: false,
        accErr: false
      };
    case EMPLOYER_LOGOUT:
      localStorage.removeItem("login");
      return {
        ...state,
        userDetails: {},
        responseFromServer: {},
        isAuth: false,
        accErr: false
      };
    default:
      return state;
  }
};
