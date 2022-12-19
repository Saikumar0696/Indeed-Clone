const initialState = {
  companySalaries: [],
  success: false,
};

export const companySalaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_COMPANY_SALARY_SUCCESS":
      return {
        companySalaries: action.payload,
        success: true,
      };
    case "FETCH_COMPANY_SALARY_FAILURE":
      return {
        ...state,
        success: false,
      };

    default:
      return state;
  }
};
