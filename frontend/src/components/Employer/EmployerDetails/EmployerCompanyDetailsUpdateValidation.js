export const isInfo = (values) => {
  let errors = {};
  if (!values.companyName || values.companyName === "") {
    errors.companyName = "Company name is required";
  }

  if (!values.employerRole || values.employerRole === "") {
    errors.employerRole = "Role is required";
  }

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
  if (
    !values.aboutTheCompany ||
    !values.aboutTheCompany.misssionandvisson ||
    values.aboutTheCompany.misssionandvisson === ""
  ) {
    errors.companySize = "Mission and Vision is required";
  }
  if (
    !values.aboutTheCompany ||
    !values.aboutTheCompany.description ||
    values.aboutTheCompany.description === ""
  ) {
    errors.revenue = "Description is required";
  }
  if (
    !values.aboutTheCompany ||
    !values.aboutTheCompany.workCulture ||
    values.aboutTheCompany.workCulture === ""
  ) {
    errors.industry = "Company Culture is required";
  }
  if (
    !values.aboutTheCompany ||
    !values.aboutTheCompany.companyValues ||
    values.aboutTheCompany.companyValues === ""
  ) {
    errors.founded = "Company Values is required";
  }
  console.log("Company 3 Validation Errors ", errors);
  return errors;
};
