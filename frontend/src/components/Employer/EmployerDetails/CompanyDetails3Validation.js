export const isInfo = (values) => {
  let errors = {};

  if (
    !values.aboutTheCompany ||
    !values.aboutTheCompany.misssionandvisson ||
    values.aboutTheCompany.misssionandvisson === ""
  ) {
    errors.misssionandvisson = "Mission and Vision is required";
  }
  if (
    !values.aboutTheCompany ||
    !values.aboutTheCompany.description ||
    values.aboutTheCompany.description === ""
  ) {
    errors.description = "Description is required";
  }
  if (
    !values.aboutTheCompany ||
    !values.aboutTheCompany.workCulture ||
    values.aboutTheCompany.workCulture === ""
  ) {
    errors.workCulture = "Company Culture is required";
  }
  if (
    !values.aboutTheCompany ||
    !values.aboutTheCompany.companyValues ||
    values.aboutTheCompany.companyValues === ""
  ) {
    errors.companyValues = "Company Values is required";
  }
  console.log("Company 3 Validation Errors ", errors);
  return errors;
};
