import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Grid, OutlinedInput, Button } from "@material-ui/core";
import { Col, Row } from "react-bootstrap";
import {
  Box,
  makeStyles,
  withStyles,
  FormHelperText,
  FormLabel,
} from "@material-ui/core";
import { isInfo } from "./JobDetails2Validation";
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

  outlinedInputForRadioBtn: {
    borderRadius: "10px",
    border: "0.5px solid #2D2D2D",
    height: "42px",
    width: "100%",
    margin: "10px 0",
    paddingTop: "8px",
    paddingLeft: "10px",
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

function JobDetails2({ step, setStep, jobDetails, setjobDetails }) {
  const classes = useStyles();
  const [errors, setErrors] = useState({});

  const onjobDetailsChange = (e) => {
    console.log("Radio Buttons Name", e.target.name);
    console.log("Radio Buttons Value", e.target.value);
    if (e.target.name === "isRemote") {
      setjobDetails({
        ...jobDetails,
        isRemote: e.target.value === "Remote",
      });
      return;
    }
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

  return (
    <>
      <Container className={classes.container} maxWidth='xl'>
        <Box className={classes.boxForm} sx={{ borderRadius: 16 }}>
          <Grid item style={{ margin: "25px 0" }}>
            <form className={classes.formStyle}>
              <FormHelperText className={classes.formhelperText}>
                Which option best describes this role's location? *
              </FormHelperText>
              <div className={classes.outlinedInputForRadioBtn}>
                <Row style={{ paddingBottom: "20px", paddingRight: "10%" }}>
                  <Col xs={1} style={{ paddingRight: "0%" }}>
                    <input
                      checked={!jobDetails.isRemote}
                      type='radio'
                      value='In-Person'
                      name='isRemote'
                      onClick={onjobDetailsChange}
                      style={{
                        height: "22px",
                        width: "22px",
                        verticalAlign: "middle",
                      }}
                    />
                  </Col>
                  <Col>
                    <FormLabel> In-Person</FormLabel>
                  </Col>
                </Row>
              </div>

              <div className={classes.outlinedInputForRadioBtn}>
                <Row style={{ paddingBottom: "20px" }}>
                  <Col xs={1} style={{ paddingRight: "0%" }}>
                    <input
                      checked={jobDetails.isRemote}
                      type='radio'
                      value='Remote'
                      name='isRemote'
                      onClick={onjobDetailsChange}
                      style={{
                        height: "22px",
                        width: "22px",
                        verticalAlign: "middle",
                      }}
                    />
                  </Col>
                  <Col>
                    <FormLabel>Remote</FormLabel>
                  </Col>
                </Row>
              </div>

              <br />
              <FormHelperText className={classes.formhelperText}>
                Is this a full-time or part-time job?*
              </FormHelperText>

              <div className={classes.outlinedInputForRadioBtn}>
                <Row style={{ paddingBottom: "20px" }}>
                  <Col xs={1} style={{ paddingRight: "0%" }}>
                    <input
                      checked={jobDetails.jobType === "Part-Time"}
                      type='radio'
                      value='Part-Time'
                      name='jobType'
                      onClick={onjobDetailsChange}
                      style={{
                        height: "22px",
                        width: "22px",
                        verticalAlign: "middle",
                        backgroundColor: "black",
                      }}
                    />
                  </Col>
                  <Col>
                    <FormLabel> Part-Time</FormLabel>
                  </Col>
                </Row>
              </div>
              <div className={classes.outlinedInputForRadioBtn}>
                <Row style={{ paddingBottom: "20px" }}>
                  <Col xs={1} style={{ paddingRight: "0%" }}>
                    <input
                      checked={jobDetails.jobType === "Full-Time"}
                      type='radio'
                      value='Full-Time'
                      name='jobType'
                      onClick={onjobDetailsChange}
                      style={{
                        height: "22px",
                        width: "22px",
                        verticalAlign: "middle",
                        backgroundColor: "black",
                      }}
                    />
                  </Col>
                  <Col>
                    <FormLabel> Full-Time</FormLabel>
                  </Col>
                </Row>
              </div>
              <br />
              <FormHelperText className={classes.formhelperText}>
                Industry*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInput}
                onChange={onjobDetailsChange}
                value={jobDetails.industry}
                error={errors.industry}
                type='text'
                variant='outlined'
                name='industry'
              />
              <br />
              <br />
              <FormHelperText className={classes.formhelperText}>
                Salary*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInput}
                onChange={onjobDetailsChange}
                value={jobDetails.salary}
                error={errors.salary}
                required
                type='number'
                variant='outlined'
                name='salary'
              />
              <br />
              <br />
              <FormHelperText className={classes.formhelperText}>
                Compensation*
              </FormHelperText>
              <OutlinedInput
                className={classes.outlinedInput}
                onChange={onJobDescription}
                value={jobDetails.jobDescription.compensation}
                error={errors.compensation}
                required
                type='number'
                variant='outlined'
                name='compensation'
              />
              <br />
              <br />
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

JobDetails2.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
};

export default JobDetails2;
