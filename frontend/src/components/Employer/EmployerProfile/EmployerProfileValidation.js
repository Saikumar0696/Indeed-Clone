export const isInfo = (values) => {
  let errors = {};

  if (!values.employerName || values.employerName === "") {
    errors.employerName = "Employer name is required";
  }
  if (!values.employerRole || values.employerRole === "") {
    errors.employerRole = "Role is required";
  }
  if (!values.city || values.city === "") {
    errors.city = "city is required";
  }
  if (!values.state || values.state.value === "Select Region") {
    errors.state = "State is required";
  }
  if (!values.streetAddress || values.streetAddress === "") {
    errors.streetAddress = "Street Address is required";
  }
  if (!values.zipCode || values.zipCode === "") {
    errors.zipCode = "Zip code is required";
  }
  if (!values.country || values.country === "") {
    errors.country = "Country is required";
  }

  return errors;
};
