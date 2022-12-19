export const validateProfile = (values) => {
    return new Promise((resolve, reject) => {
        let errors = {};
        if (!values.email) {
            errors.email = "Email required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Email address is invalid";
        }
        if (!values.name) {
            errors.name = "Name is required";
        } 
        if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(values.contact)) {
            errors.contact = "Contact is not valid"
        }
        if (!values.location) {
            errors.location = "Location is required";
        }
        resolve(errors);
    });
  };