export const isInfo = (values) => {
  let errors = {};
  if (!values.jobTitle || values.jobTitle === "") {
    errors.jobTitle = "jobTitle is required";
  }
  if (!values.companyName || values.companyName === "") {
    errors.companyName = "companyName name is required";
  }
  if (
    !values.jobLocation ||
    !values.jobLocation.address ||
    values.jobLocation.address === ""
  ) {
    errors.address = "Address is required";
  }
  if (
    !values.jobLocation ||
    !values.jobLocation.city ||
    values.jobLocation.city === ""
  ) {
    errors.city = "city is required";
  }
  if (
    !values.jobLocation ||
    !values.jobLocation.state ||
    values.jobLocation.state === "Select Region"
  ) {
    errors.state = "State is required";
  }

  if (
    !values.jobLocation ||
    !values.jobLocation.zipcode ||
    values.jobLocation.zipcode === ""
  ) {
    errors.zipcode = "Zip code is required";
  }
  if (
    !values.jobLocation ||
    !values.jobLocation.country ||
    values.jobLocation.country === "" ||
    values.jobLocation.country === "Select Country"
  ) {
    errors.country = "Country is required";
  }

  return errors;
};
