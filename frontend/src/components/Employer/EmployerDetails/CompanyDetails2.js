import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Grid, OutlinedInput, Button } from "@material-ui/core";

import {
  Box,
  makeStyles,
  withStyles,
  FormHelperText,
  Select,
  MenuItem,
} from "@material-ui/core";
import { isInfo } from "./CompanyDetails2Validation";
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

function CompanyDetails2({
  step,
  setStep,
  employerDetails,
  setemployerDetails,
}) {
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onEmployerDetailsChange = (e) => {
    setemployerDetails({
      ...employerDetails,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = isInfo(employerDetails);
    const errors = isInfo(employerDetails);
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
  // const { isAuth } = useSelector((state) => state.login);
  const { responseFromServer } = useSelector((state) => state.signup);

  return (
    <>
      {responseFromServer.role !== 1 && <Redirect to='/employer/home' />}
      <Container className={classes.container} maxWidth='xl'>
        <Box className={classes.boxForm} sx={{ borderRadius: 16 }}>
          <Grid item style={{ margin: "25px 0" }}>
            <form className={classes.formStyle}>
              <FormHelperText className={classes.formhelperText}>
                Company Website*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInput}
                onChange={onEmployerDetailsChange}
                value={employerDetails.website}
                error={errors.website}
                required
                type='text'
                variant='outlined'
                name='website'
              />
              <br />
              <br />
              <FormHelperText className={classes.formhelperText}>
                Company Type*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInput}
                onChange={onEmployerDetailsChange}
                value={employerDetails.companyType}
                error={errors.companyType}
                type='text'
                variant='outlined'
                name='companyType'
              />
              <br />
              <br />
              <FormHelperText className={classes.formhelperText}>
                Your company's number of employees*
              </FormHelperText>

              <Select
                className={classes.outlinedInput}
                variant='outlined'
                onChange={onAboutCompanyChange}
                error={errors.companySize}
                value={employerDetails.aboutTheCompany.companySize}
                name='companySize'>
                <MenuItem aria-label='None' value={0}>
                  Choose the Company Size
                </MenuItem>
                <MenuItem value={1}>1 to 49</MenuItem>
                <MenuItem value={2}>50 to 149</MenuItem>
                <MenuItem value={3}>150 to 249</MenuItem>
                <MenuItem value={4}>250 to 449</MenuItem>
                <MenuItem value={5}>500 to 749</MenuItem>
                <MenuItem value={6}>750 to 999</MenuItem>
                <MenuItem value={7}>1000+</MenuItem>
              </Select>
              <br />
              <br />

              <FormHelperText className={classes.formhelperText}>
                Revenue*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInput}
                onChange={onAboutCompanyChange}
                value={employerDetails.aboutTheCompany.revenue}
                error={errors.revenue}
                required
                placeholder='Eg:$300M'
                type='text'
                variant='outlined'
                name='revenue'
              />
              <br />
              <br />
              <FormHelperText className={classes.formhelperText}>
                HeadQuarters*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInput}
                onChange={onAboutCompanyChange}
                value={employerDetails.aboutTheCompany.headQuarters}
                error={errors.headQuarters}
                required
                type='text'
                variant='outlined'
                name='headQuarters'
              />
              <br />
              <br />
              <FormHelperText className={classes.formhelperText}>
                Industry*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInput}
                onChange={onAboutCompanyChange}
                error={errors.industry}
                value={employerDetails.aboutTheCompany.industry}
                required
                type='text'
                variant='outlined'
                name='industry'
              />
              <br />
              <br />
              <FormHelperText className={classes.formhelperText}>
                Founded*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInput}
                onChange={onAboutCompanyChange}
                error={errors.founded}
                value={employerDetails.aboutTheCompany.founded}
                required
                type='number'
                placeholder='Eg:1947'
                variant='outlined'
                name='founded'
              />
              <br />
              <br />

              <FormHelperText className={classes.formhelperText}>
                CEO Name*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInput}
                onChange={onAboutCompanyChange}
                error={errors.ceo}
                value={employerDetails.aboutTheCompany.ceo}
                required
                type='text'
                variant='outlined'
                name='ceo'
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
                Save and Continue
              </SignInButton>
            </Grid>
          </Grid>
        </Box>
      </Container>
      {isError && (
        <Alert severity='error'>
          One or More fields are missing or wrong data!
        </Alert>
      )}
      {success && (
        <Alert severity='success'>Employer registered successfully!</Alert>
      )}
    </>
  );
}

CompanyDetails2.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
};

export default CompanyDetails2;
