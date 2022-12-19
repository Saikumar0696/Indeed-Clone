import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Container, Grid, OutlinedInput, Button } from "@material-ui/core";
import { Box, makeStyles, withStyles, FormHelperText } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { isInfo } from "./CompanyDetails3Validation";
import { employerDetailsAdd } from "../../../Redux/Actions/EmployerDetailsAction";
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

function CompanyDetails3({
  step,
  setStep,
  employerDetails,
  setemployerDetails,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);
  const signup = useSelector((state) => state.signup);
  const { employerDetails: stateEmployerDetails } = useSelector(
    (state) => state
  );
  const { responseFromServer } = signup;

  const onAboutCompanyChange = (e) => {
    const { aboutTheCompany } = employerDetails;
    setemployerDetails({
      ...employerDetails,
      aboutTheCompany: {
        ...aboutTheCompany,
        [e.target.name]: e.target.value,
      },
    });
  };
  useEffect(() => {
    if (employerDetails.employerID)
      dispatch(employerDetailsAdd(employerDetails));
  }, [employerDetails.employerID]);

  useEffect(() => {
    if (stateEmployerDetails.responseFromServer) {
      setSuccess(true);
      setIsError(false);
    }
  }, [stateEmployerDetails.responseFromServer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = isInfo(employerDetails);
    const errors = isInfo(employerDetails);
    setErrors(errors);
    if (Object.keys(error).length !== 0) {
      setIsError(true);
      setSuccess(false);
      return;
    }
    if (responseFromServer) {
      // console.log("signup.responseFromServer,", responseFromServer.employerID);
      setemployerDetails({
        ...employerDetails,
        employerID: responseFromServer.employerID,
      });
      console.log("employerDetails", employerDetails);
    }
  };

  return (
    <>
      {stateEmployerDetails && stateEmployerDetails.addErrorResponse && (
        <Alert severity='error'>Employer Registration Error!</Alert>
      )}
      <Container className={classes.container} maxWidth='xl'>
        <Box className={classes.boxForm} sx={{ borderRadius: 16 }}>
          <Grid item style={{ margin: "25px 0" }}>
            <form className={classes.formStyle}>
              <FormHelperText className={classes.formhelperText}>
                Mission and Vision*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInputtextarea}
                onChange={onAboutCompanyChange}
                multiline
                type='textarea'
                rows={4}
                value={employerDetails.aboutTheCompany.misssionandvisson}
                required
                variant='outlined'
                name='misssionandvisson'
                error={errors.misssionandvisson}
              />
              <br />
              <br />
              <FormHelperText className={classes.formhelperText}>
                Company Description*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInputtextarea}
                onChange={onAboutCompanyChange}
                multiline
                type='textarea'
                rows={4}
                value={employerDetails.aboutTheCompany.description}
                required
                variant='outlined'
                name='description'
                error={errors.description}
              />
              <br />
              <br />
              <FormHelperText className={classes.formhelperText}>
                Company Values*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInputtextarea}
                onChange={onAboutCompanyChange}
                value={employerDetails.aboutTheCompany.companyValues}
                required
                multiline
                rows={4}
                type='textArea'
                variant='outlined'
                name='companyValues'
                error={errors.companyValues}
              />
              <br />
              <br />

              <FormHelperText className={classes.formhelperText}>
                Company Work Culture*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInputtextarea}
                onChange={onAboutCompanyChange}
                value={employerDetails.aboutTheCompany.workCulture}
                required
                type='textArea'
                multiline
                rows={4}
                variant='outlined'
                name='workCulture'
                error={errors.workCulture}
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
      </Container>
      {isError && <Alert severity='error'>Check the fields again!</Alert>}
      {success && (
        <Alert severity='success'>Employer registered successfully!</Alert>
      )}
      {success && <Redirect to='/login' />}
      {/* // : <Redirect to='/' /> */}
    </>
  );
}

CompanyDetails3.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
};

export default CompanyDetails3;
