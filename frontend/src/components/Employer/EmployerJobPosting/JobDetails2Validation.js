export const isInfo = (values) => {
  let errors = {};
  if (!values.industry || values.industry === "") {
    errors.industry = "industry is required";
  }
  if (!values.salary || values.salary === "" || values.salary < 0) {
    errors.salary = "salary is required";
  }
  if (
    !values.jobDescription ||
    !values.jobDescription.compensation ||
    values.jobDescription.compensation === "" ||
    values.jobDescription.compensation < 0
  ) {
    errors.compensation = "compensation is required";
  }

  return errors;
};
