const initialState = {
  errorResponse: null,
  responseFromServer: [],
  length: 0,
};

export const userJobReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_EMPLOYER_ALL_JOBS":
      return {
        ...state,
        responseFromServer: action.payload.jobs,
        length: action.payload.length,
      };

    case "EMPLOYER_ALL_JOBS_ERROR":
      return {
        ...initialState,
        errorResponse: action.payload,
      };

    default:
      return state;
  }
};
