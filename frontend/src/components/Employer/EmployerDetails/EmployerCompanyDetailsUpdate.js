import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  OutlinedInput,
  makeStyles,
  withStyles,
  FormHelperText,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { isInfo } from "./EmployerCompanyDetailsUpdateValidation";
import NativeSelect from "@material-ui/core/NativeSelect";
import {
  employerDetailsGet,
  employerDetailsAdd,
} from "../../../Redux/Actions/EmployerDetailsAction";
import MuiAlert from "@mui/material/Alert";
import { useHistory, Redirect } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#f2f2f2",
    paddingTop: "2%",
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
    width: "60%",
    padding: "20px",
  },

  boxForm1: {
    backgroundColor: "#ffffff",
    width: "60%",
    padding: "2%",
    display: "flex",
    justifyContent: "center",
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
  outlinedInputtextarea: {
    width: "100%",
    border: "0.5px solid #2D2D2D",
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

function EmployerCompanyDetailsUpdate(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let [employerDetails, setemployerDetails] = useState({ aboutTheCompany: {} });
  let { isAuth, userDetails } = useSelector((state) => state.login);

  let { responseFromServer } = useSelector((state) => state.employerDetails);
  let { signup } = useSelector((state) => state);
  const history = useHistory();

  useEffect(() => {
    // if (signup && signup.responseFromServer) {
    //   dispatch(employerDetailsGet(signup.responseFromServer.employerID));
    // }
    if (userDetails && userDetails.userId) {
      dispatch(employerDetailsGet(userDetails.userId));
    }
  }, [props]);

  useEffect(() => {
    if (responseFromServer) {
      console.log("Response From Server", responseFromServer);
      setemployerDetails({
        ...responseFromServer,
      });
      console.log("Employer Details ", employerDetails);
    }
  }, [responseFromServer]);

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
  console.log("Employer Details New: ", employerDetails);
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);

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
    setErrors(errors);
    setIsError(false);
    setSuccess(true);
    dispatch(employerDetailsAdd(employerDetails));
  };
  let { role } = useSelector((state) => state.login.userDetails);

  return (
    <>
      {(!isAuth || role !== 1) && <Redirect to='/login' />}
      <Container className={classes.container} maxWidth='xl'>
        <Box className={classes.boxForm1} sx={{ borderRadius: 16 }}>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item xs={6}>
              <Typography className={classes.h4} variant='h4'>
                Update Company Details
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
        <Box className={classes.boxForm} sx={{ borderRadius: 16 }}>
          <Grid item style={{ margin: "25px 0" }}>
            <form className={classes.formStyle}>
              <Grid style={{ display: "flex" }}>
                <Box style={{ flex: 1 }}>
                  {" "}
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
                  <NativeSelect
                    className={classes.outlinedInput}
                    onChange={onAboutCompanyChange}
                    error={errors.companySize}
                    value={employerDetails.aboutTheCompany.companySize}
                    name='companySize'>
                    <option aria-label='None'>Choose the Company Size</option>
                    <option value={1}>1 to 49</option>
                    <option value={2}>50 to 149</option>
                    <option value={3}>150 to 249</option>
                    <option value={4}>250 to 449</option>
                    <option value={5}>500 to 749</option>
                    <option value={6}>750 to 999</option>
                    <option value={7}>1000+</option>
                  </NativeSelect>
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
                </Box>
                <Box style={{ flex: 1, marginLeft: "5%" }}>
                  <FormHelperText className={classes.formhelperText}>
                    CEO Name*
                  </FormHelperText>
                  <OutlinedInput
                    className={classes.outlinedInput}
                    onChange={onAboutCompanyChange}
                    // error={errors.ceo}
                    value={employerDetails.aboutTheCompany.ceo}
                    required
                    type='text'
                    variant='outlined'
                    name='ceo'
                  />
                  <br />
                  <br />
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
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={2}
                justify='flex-end'
                style={{ paddingLeft: "50%" }}>
                <SignInButton
                  onClick={handleSubmit}
                  className={classes.button}
                  variant='contained'>
                  Submit
                </SignInButton>
              </Grid>
            </form>
          </Grid>
        </Box>
        {isError && (
          <Alert severity='error'>
            One or More fields missing/ or wrong data.Try again!
          </Alert>
        )}
        {success && (
          <Alert severity='success'>Details saved successfully!</Alert>
        )}
      </Container>
      <Grid
        container
        spacing={1}
        style={{
          fontSize: "14px",
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

export default EmployerCompanyDetailsUpdate;
