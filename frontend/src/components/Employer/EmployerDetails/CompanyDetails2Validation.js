export const isInfo = (values) => {
  let errors = {};

  if (
    !values.aboutTheCompany ||
    !values.aboutTheCompany.companySize ||
    values.aboutTheCompany.companySize === 0
  ) {
    errors.companySize = "Company Size is required";
  }
  if (!values.website || values.website === "") {
    errors.website = "Website is required";
  }
  if (!values.companyType || values.companyType === "") {
    errors.companyType = "Company Type is required";
  }
  if (
    !values.aboutTheCompany ||
    !values.aboutTheCompany.revenue ||
    values.aboutTheCompany.revenue === ""
  ) {
    errors.revenue = "Revenue is required";
  }
  if (
    !values.aboutTheCompany ||
    !values.aboutTheCompany.headQuarters ||
    values.aboutTheCompany.headQuarters === ""
  ) {
    errors.headQuarters = "headQuarters is required";
  }
  if (
    !values.aboutTheCompany ||
    !values.aboutTheCompany.ceo ||
    values.aboutTheCompany.ceo === ""
  ) {
    errors.ceo = "ceo is required";
  }
  if (
    !values.aboutTheCompany ||
    !values.aboutTheCompany.industry ||
    values.aboutTheCompany.industry === ""
  ) {
    errors.industry = "Industry is required";
  }
  if (
    !values.aboutTheCompany ||
    !values.aboutTheCompany.founded ||
    values.aboutTheCompany.founded <= 1000
  ) {
    errors.founded = "Founded is required";
  }
  if (
    !values.aboutTheCompany ||
    !values.aboutTheCompany.ceo ||
    values.aboutTheCompany.ceo === ""
  ) {
    errors.ceo = "Ceo is required";
  }
  return errors;
};
