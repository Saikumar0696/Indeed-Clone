import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Grid, OutlinedInput, Button } from "@material-ui/core";
import { Box, makeStyles, withStyles, FormHelperText } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { employerJobPost } from "../../../Redux/Actions/EmployerJobPostingAction";
import { isInfo } from "./JobDetails3Validation";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

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
  outlinedInputtextarea: {
    width: "100%",
    border: "0.5px solid #2D2D2D",
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
  button1: {
    width: "300px",
    borderRadius: "20px",
    height: "40px",
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

function JobDetails3({ step, setStep, jobDetails, setjobDetails }) {
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { userId } = useSelector((state) => state.login.userDetails);

  const onjobDetailsChange = (e) => {
    setjobDetails({
      ...jobDetails,
      [e.target.name]: e.target.value,
    });
  };

  const onJobDescription = (e) => {
    const { jobDescription } = jobDetails;
    setjobDetails({
      ...jobDetails,
      jobDescription: {
        ...jobDescription,
        [e.target.name]: e.target.value,
      },
    });
  };

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
    setSuccess(true);
    setErrors(errors);
    console.log("Before job post dispatch call");
    dispatch(employerJobPost({ ...jobDetails, employerID: userId }));
  };

  return (
    <>
      <Container className={classes.container} maxWidth='xl'>
        <Box className={classes.boxForm} sx={{ borderRadius: 16 }}>
          <Grid item style={{ margin: "25px 0" }}>
            <form className={classes.formStyle}>
              <FormHelperText className={classes.formhelperText}>
                Requirement*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInputtextarea}
                onChange={onJobDescription}
                error={errors.requirement}
                value={jobDetails.jobDescription.requirement}
                required
                multiline
                type='textarea'
                rows={4}
                variant='outlined'
                name='requirement'
              />
              <br />
              <br />
              <FormHelperText className={classes.formhelperText}>
                Responsibilites*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInputtextarea}
                onChange={onJobDescription}
                error={errors.responsibilites}
                value={jobDetails.jobDescription.responsibilites}
                required
                multiline
                type='textarea'
                rows={4}
                variant='outlined'
                name='responsibilites'
              />
              <br />
              <br />

              <FormHelperText className={classes.formhelperText}>
                Information*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInputtextarea}
                onChange={onJobDescription}
                error={errors.moreInfo}
                value={jobDetails.jobDescription.moreInfo}
                required
                multiline
                type='textarea'
                rows={4}
                variant='outlined'
                name='moreInfo'
              />
            </form>
          </Grid>
        </Box>
        <Box className={classes.boxForm} sx={{ borderRadius: 16 }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Button
                onClick={() => setStep(step - 1)}
                type='button'
                className={classes.button1}
                variant='contained'>
                Back
              </Button>
            </Grid>
            <Grid item xs={4}>
              <SignInButton
                onClick={handleSubmit}
                className={classes.button}
                variant='contained'>
                Submit
              </SignInButton>
            </Grid>
          </Grid>
        </Box>
        {isError && (
          <Alert severity='error'>
            One or More fields missing/ or wrong data.Try again!
          </Alert>
        )}
        {success && (
          <Alert severity='success'>Job is posted successfully!</Alert>
        )}
        {success && <Redirect to='/employer/jobs-posted/' />}
      </Container>
    </>
  );
}

JobDetails3.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
};

export default JobDetails3;
