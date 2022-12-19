import React, { useState } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { Box, makeStyles, AppBar, Toolbar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import CompanyDetails1 from "./CompanyDetails1";
import CompanyDetails2 from "./CompanyDetails2";
import CompanyDetails3 from "./CompanyDetails3";

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

function EmployerSignup() {
  const isAuth = true;
  const classes = useStyles();
  const [employerDetails, setemployerDetails] = useState({
    employerID: "",
    employerName: "",
    employerRole: "",
    companyName: "",
    website: "",
    companyType: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    aboutTheCompany: {
      revenue: "",
      headQuarters: "",
      industry: "",
      founded: "",
      misssionandvisson: "",
      ceo: "",
      description: "",
      companySize: "",
      workCulture: "",
      companyValues: "",
    },
  });
  const dispatch = useDispatch();
  let [step, setStep] = useState(1);
  //   const [user, setUser] = useReducer(UserReducer, DefaultUser);
  const success = false;
  const isError = false;
  const errorMsg = false;

  function showStep(step, setStep, employerDetails, setemployerDetails) {
    switch (step) {
      case 1:
        return (
          <CompanyDetails1
            setStep={setStep}
            step={step}
            employerDetails={employerDetails}
            setemployerDetails={setemployerDetails}
          />
        );
      case 2:
        return (
          <CompanyDetails2
            setStep={setStep}
            step={step}
            employerDetails={employerDetails}
            setemployerDetails={setemployerDetails}
          />
        );
      case 3:
        return (
          <CompanyDetails3
            setStep={setStep}
            step={step}
            employerDetails={employerDetails}
            setemployerDetails={setemployerDetails}
          />
        );
      default:
        return (
          <CompanyDetails1
            setStep={setStep}
            step={step}
            employerDetails={employerDetails}
            setemployerDetails={setemployerDetails}
          />
        );
    }
  }
  console.log("Step Value in Employer Signup ", step);

  return (
    <>
      <AppBar position='static' style={{ background: "#2D2D2D" }}>
        <Toolbar variant='dense'>
          <img
            className={classes.inddedLogo}
            src='/Images/Indeed_Employer_logo.png'
            alt=''
          />
        </Toolbar>
      </AppBar>

      <Container className={classes.container} maxWidth='xl'>
        <br />
        <br />
        <Box className={classes.boxForm} sx={{ borderRadius: 16 }}>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item xs={6}>
              <Typography className={classes.h4} variant='h4'>
                Create an employer account
              </Typography>
            </Grid>
            <br />
            <Grid item xs={6}>
              <img
                className={classes.imgLogo}
                src='/Images/Employer_Details_logo.png'
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
                You haven't posted a job before, so you'll need to create an
                employer account.
              </Typography>
            </Grid>
          </Grid>
          <Grid item style={{ margin: "25px 0" }}>
            {showStep(step, setStep, employerDetails, setemployerDetails)}
          </Grid>
        </Box>
        <br />
        <br />

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
      </Container>
    </>
  );
}

export default EmployerSignup;
