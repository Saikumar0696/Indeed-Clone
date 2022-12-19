import React, { useState } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { Box, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import JobDetails1 from "./JobDetails1";
import JobDetails2 from "./JobDetails2";
import JobDetails3 from "./JobDetails3";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

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
    width: "450px",
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

function EmployerJobPost() {
  const classes = useStyles();
  const [jobDetails, setjobDetails] = useState({
    jobTitle: "",
    companyName: "",
    industry: "",
    jobLocation: { address: "", city: "", state: "", country: "", zipcode: "" },
    jobType: "Full-Time",
    isRemote: false,
    salary: "",
    jobDescription: {
      compensation: "",
      requirement: "",
      moreInfo: "",
      responsibilites: "",
    },
  });
  let [step, setStep] = useState(1);

  function showStep(step, setStep, jobDetails, setjobDetails) {
    switch (step) {
      case 1:
        return (
          <JobDetails1
            setStep={setStep}
            step={step}
            jobDetails={jobDetails}
            setjobDetails={setjobDetails}
          />
        );
      case 2:
        return (
          <JobDetails2
            setStep={setStep}
            step={step}
            jobDetails={jobDetails}
            setjobDetails={setjobDetails}
          />
        );
      case 3:
        return (
          <JobDetails3
            setStep={setStep}
            step={step}
            jobDetails={jobDetails}
            setjobDetails={setjobDetails}
          />
        );
      default:
        return (
          <JobDetails1
            setStep={setStep}
            step={step}
            jobDetails={jobDetails}
            setjobDetails={setjobDetails}
          />
        );
    }
  }
  const isAuth = useSelector((state) => state.login.isAuth);
  const { role } = useSelector((state) => state.login.userDetails);

  return (
    <>
      {(!isAuth || role !== 1) && <Redirect to='/login' />}
      <Container className={classes.container} maxWidth='xl'>
        <br />
        <br />
        <Box className={classes.boxForm} sx={{ borderRadius: 16 }}>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item xs={6}>
              <Typography className={classes.h4} variant='h4'>
                Create a job post
              </Typography>
            </Grid>
            <br />
            <Grid item xs={6}>
              <img
                className={classes.imgLogo}
                src='/Images/Job_logo.png'
                alt=''
              />
            </Grid>
          </Grid>
        </Box>
        <br />
        <br />
        <Box className={classes.boxForm} sx={{ borderRadius: 16 }}>
          <Grid container spacing={3}>
            <Grid item>
              <Typography className={classes.h5} variant='h5'>
                Fill the below Job Details form to post the job.
              </Typography>
            </Grid>
          </Grid>
          <Grid item style={{ margin: "25px 0" }}>
            {showStep(step, setStep, jobDetails, setjobDetails)}
          </Grid>
        </Box>
        <br />
        <br />
      </Container>
      <Grid
        container
        spacing={1}
        style={{ 
          fontSize: "14px",
          backgroundColor: "white",
          padding: "15px 10px",
          margin: "0 -20px ",
        }}>
        <Grid item style={{ cursor: "pointer" }}>
          © 2020 Indeed
        </Grid>
        <Grid item>-</Grid>
        <Grid item style={{ cursor: "pointer" }}>
          Accessibility at Indeed
        </Grid>
        <Grid item>-</Grid>
        <Grid item style={{ cursor: "pointer" }}>
          Privacy Center
        </Grid>
        <Grid item>-</Grid>
        <Grid item style={{ cursor: "pointer" }}>
          Cookies
        </Grid>
        <Grid item>-</Grid>
        <Grid item style={{ cursor: "pointer" }}>
          Privacy
        </Grid>
        <Grid item>-</Grid>
        <Grid item style={{ cursor: "pointer" }}>
          Terms
        </Grid>
      </Grid>
    </>
  );
}

export default EmployerJobPost;
