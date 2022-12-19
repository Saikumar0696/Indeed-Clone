export const isInfo = (values) => {
  let errors = {};

  if (
    !values.jobDescription ||
    !values.jobDescription.requirement ||
    values.jobDescription.requirement === ""
  ) {
    errors.requirement = "requirement is required";
  }
  if (
    !values.jobDescription ||
    !values.jobDescription.responsibilites ||
    values.jobDescription.responsibilites === ""
  ) {
    errors.responsibilites = "responsibilites is required";
  }
  if (
    !values.jobDescription ||
    !values.jobDescription.moreInfo ||
    values.jobDescription.moreInfo === ""
  ) {
    errors.moreInfo = "moreInfo is required";
  }

  return errors;
};
