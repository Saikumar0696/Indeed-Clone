import React, { useState } from "react";
import PropTypes from "prop-types";

import { Container, Grid, OutlinedInput, Button } from "@material-ui/core";
import { Box, makeStyles, withStyles, FormHelperText } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { isInfo } from "./JobDetails1Validation";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#f2f2f2",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  boxImg: {
    width: "450px",
    display: "flex",
    height: "40px",
    justifyContent: "center",
    margin: "60px 0 30px",
  },
  imgLogo: {
    height: "130px",
  },
  inddedLogo: {
    height: "40px",
  },
  boxForm: {
    backgroundColor: "#ffffff",
    width: "650px",
    padding: "20px",
  },
  outlinedInput: {
    borderRadius: "10px",
    border: "0.5px solid #2D2D2D",
    height: "42px",
    width: "100%",
    margin: "10px 0",
  },
  h5: {
    fontWeight: "bold",
    fontSize: "1.4rem",
    fontFamily:
      "Noto Sans, Helvetica Neue , Helvetica, Arial, Liberation Sans, Roboto, Noto, sans-serif",
  },
  h4: {
    fontSize: "1.75rem",
    fontWeight: "bold",
    fontFamily:
      "Noto Sans, Helvetica Neue , Helvetica, Arial, Liberation Sans, Roboto, Noto, sans-serif",
  },
  formhelperText: {
    fontWeight: "600",
    fontSize: "17.5px",
    color: "#4b4b4b",
  },
  checkbox: {
    marginBottom: "10px",
  },
  button: {
    width: "300px",
    borderRadius: "20px",
    height: "40px",
    backgroundColor: "#164081",
  },
  divider: {
    backgroundColor: "#f2f2f2",
    heigth: "10px",
    width: "150px",
    margin: "0 30px",
  },
  pageBreak: {
    backgroundColor: "#f2f2f2",
    heigth: "10px",
    width: "440px",
    margin: "30px 30px 20px",
  },
  formStyle: {
    width: "100%",
  },
}));

const SignInButton = withStyles((theme) => ({
  root: {
    color: "#ffffff",
    backgroundColor: "#164081",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0542ac",
    },
  },
}))(Button);

function JobDetails1({ step, setStep, jobDetails, setjobDetails }) {
  console.log("Step Value in Company Details 1 ", step);
  const classes = useStyles();
  const [errors, setErrors] = useState({});

  const onJobDetailsChange = (e) => {
    setjobDetails({
      ...jobDetails,
      [e.target.name]: e.target.value,
    });
  };
  const onJobLocationChange = (e) => {
    const { jobLocation } = jobDetails;
    setjobDetails({
      ...jobDetails,
      jobLocation: {
        ...jobLocation,
        [e.target.name]: e.target.value,
      },
    });
  };

  const selectCountry = (val) => {
    const { jobLocation } = jobDetails;
    setjobDetails({
      ...jobDetails,
      jobLocation: {
        ...jobLocation,
        country: val,
      },
    });
  };

  const selectRegion = (val) => {
    const { jobLocation } = jobDetails;
    setjobDetails({
      ...jobDetails,
      jobLocation: {
        ...jobLocation,
        state: val,
      },
    });
  };
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const error = isInfo(jobDetails);
    const errors = isInfo(jobDetails);
    setErrors(errors);
    if (Object.keys(error).length !== 0) {
      console.log("Setting isError to True");
      setIsError(true);
      setSuccess(false);
      return;
    }

    if (Object.keys(errors).length > 0) return;
    setStep(step + 1);
  };
  const { isAuth } = useSelector((state) => state.login);
  const { role } = useSelector((state) => state.login.userDetails);

  return (
    <>
      {(!isAuth || role !== 1) && <Redirect to='/login' />}
      <Container className={classes.container} maxWidth='xl'>
        <Box className={classes.boxForm} sx={{ borderRadius: 16 }}>
          <Grid item style={{ margin: "25px 0" }}>
            <form className={classes.formStyle}>
              <FormHelperText className={classes.formhelperText}>
                Job title*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInput}
                onChange={onJobDetailsChange}
                value={jobDetails.jobTitle}
                name='jobTitle'
                error={errors.jobTitle}
                required
                placeholder='Please enter job title'
                type='text'
              />
              <br />
              <br />
              <FormHelperText className={classes.formhelperText}>
                Company Name*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInput}
                onChange={onJobDetailsChange}
                value={jobDetails.companyName}
                name='companyName'
                error={errors.companyName}
                placeholder='Please enter Company Name'
                required
                type='text'
              />
              <br />
              <br />
              <FormHelperText className={classes.formhelperText}>
                Address*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInput}
                onChange={onJobLocationChange}
                value={jobDetails.jobLocation.address}
                required
                error={errors.address}
                placeholder='Address Location of job'
                type='text'
                name='address'
              />
              <br />
              <br />
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormHelperText className={classes.formhelperText}>
                    City*
                  </FormHelperText>
                  <OutlinedInput
                    className={classes.outlinedInput}
                    onChange={onJobLocationChange}
                    value={jobDetails.jobLocation.city}
                    error={errors.city}
                    required
                    placeholder='Please enter city'
                    type='text'
                    variant='outlined'
                    name='city'
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormHelperText className={classes.formhelperText}>
                    State*
                  </FormHelperText>
                  <RegionDropdown
                    className={classes.outlinedInput}
                    disableWhenEmpty
                    country={jobDetails.jobLocation.country}
                    value={jobDetails.jobLocation.state}
                    name='state'
                    error={errors.state}
                    onChange={(val) => selectRegion(val)}
                  />
                </Grid>
                <Grid item xs>
                  <FormHelperText className={classes.formhelperText}>
                    Zip code*
                  </FormHelperText>
                  <OutlinedInput
                    className={classes.outlinedInput}
                    onChange={onJobLocationChange}
                    value={jobDetails.jobLocation.zipcode}
                    error={errors.zipcode}
                    required
                    type='text'
                    placeholder='Please enter zip code'
                    variant='outlined'
                    name='zipcode'
                  />
                </Grid>
              </Grid>
              <br />
              <FormHelperText className={classes.formhelperText}>
                Country*
              </FormHelperText>
              <CountryDropdown
                name='country'
                value={jobDetails.jobLocation.country}
                error={errors.country}
                className={classes.outlinedInput}
                onChange={(val) => selectCountry(val)}
              />
            </form>
          </Grid>
        </Box>

        <Box className={classes.boxForm} sx={{ borderRadius: 16 }}>
          <Grid item xs={2} style={{ paddingLeft: "50%" }}>
            <SignInButton
              onClick={handleSubmit}
              className={classes.button}
              variant='contained'>
              Save and Continue
            </SignInButton>
          </Grid>
        </Box>
        {isError && (
          <Alert severity='error'>
            One or More fields missing/ or wrong data.Try again!
          </Alert>
        )}
        {success && (
          <Alert severity='success'>Details Filled successfully!</Alert>
        )}
      </Container>
    </>
  );
}

JobDetails1.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
};

export default JobDetails1;
