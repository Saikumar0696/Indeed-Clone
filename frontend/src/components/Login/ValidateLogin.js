export const validatelogin = (values) => {
  return new Promise((resolve, reject) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 1) {
      errors.password = "Password needs to be 6 characters or more";
    }
    resolve(errors);
  });
};