import React from "react";
import { useLocation } from "react-router-dom";

import { Grid } from "@material-ui/core";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    top: "20%",
    marginLeft: "30%",
    alignSelf: "flex-start",
    border: "1px solid blue",
    padding: "20px",
    flex: "1",
    borderRadius: "10px ",
    width: "40%",
    marginTop: "2%",
    fontFamily: "Noto Sans,Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  boxForm: {
    backgroundColor: "#ffffff",
    width: "650px",
    padding: "20px",
  },

  imgLogo: {
    height: "130px",
  },
  h4: {
    fontSize: "1.75rem",
    fontWeight: "bold",
    fontFamily:
      "Noto Sans, Helvetica Neue , Helvetica, Arial, Liberation Sans, Roboto, Noto, sans-serif",
  },
  link: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    height: "53px",
    padding: "0 25px",
    fontSize: "20px",
    color: "white",

    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: "white",
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));

function EachJobDetails(props) {
  let location = useLocation();
  let jobData = { jobLocation: {}, jobDescription: {} };
  if (location.state && location.state.row) {
    jobData = location.state.row.eachjob;
  }

  console.log("Job Details ", jobData);
  const classes = useStyles();

  const isAuth = useSelector((state) => state.login.isAuth);
  console.log("isAuth of each job", isAuth);
  return (
    <>
      {!isAuth && <Redirect to='/login' />}

      <Box className={classes.container}>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={6}>
            <Typography className={classes.h4} variant='h4'>
              Job Information
            </Typography>
          </Grid>
          <br />
          <Grid item xs={6}>
            <img
              className={classes.imgLogo}
              src='/Images/Employer_Jobss_logo.png'
              alt=''
            />
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.container}>
        <div>
          <Link
            style={{ textDecoration: "none" }}
            to={{
              pathname: `/employer/applicant-page/${jobData._id}&${jobData.employerId}`,
              pathname: `/employer/applicant-page/${jobData._id}&${jobData.employerID}`,
              state: {},
            }}>
            <Typography variant={"h5"} style={{ marginBottom: "2px" }}>
              {jobData.jobTitle}
            </Typography>
          </Link>
        </div>
        <div>
          <Typography
            style={{
              marginBottom: "2px",
              fontSize: "12pt",
              fontWeight: "400",
            }}>
            {jobData.companyName}
          </Typography>
        </div>
        <div>
          <Typography
            style={{
              marginBottom: "2px",
              fontSize: "12pt",
              fontWeight: "400",
            }}>
            {jobData.jobLocation.address}, {jobData.jobLocation.city},{" "}
            {jobData.jobLocation.state}
          </Typography>
        </div>
        <div>
          <Typography
            style={{
              marginBottom: "2px",
              fontSize: "12pt",
              fontWeight: "400",
            }}>
            {jobData.jobLocation.country} {jobData.jobLocation.zipcode}
          </Typography>
        </div>
        <hr />
        <div>
          <Typography
            variant={"h5"}
            style={{ marginBottom: "15px", fontSize: "1.125rem" }}>
            Job Details
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h5"}
            style={{
              marginBottom: "10px",
              fontSize: "10pt",
              wordWrap: "break-word",
            }}>
            Salary
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h6"}
            style={{
              marginBottom: "15px",
              fontSize: "10pt",
              fontWeight: "400",
            }}>
            ${jobData.salary}
          </Typography>
        </div>

        <div>
          <Typography
            variant={"h5"}
            style={{
              marginBottom: "10px",
              fontSize: "10pt",
              wordWrap: "break-word",
            }}>
            Job Type
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h6"}
            style={{
              marginBottom: "15px",
              fontSize: "10pt",
              fontWeight: "400",
            }}>
            {jobData.jobType}
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h5"}
            style={{
              marginBottom: "10px",
              fontSize: "10pt",
              wordWrap: "break-word",
            }}>
            Is Remote{" "}
          </Typography>
        </div>
        <div>
          {jobData.isRemote ? (
            <Typography
              variant={"h6"}
              style={{
                marginBottom: "2px",
                fontSize: "10pt",
                fontWeight: "400",
              }}>
              Yes
            </Typography>
          ) : (
            <Typography
              variant={"h6"}
              style={{
                marginBottom: "2px",
                fontSize: "10pt",
                fontWeight: "400",
              }}>
              No
            </Typography>
          )}
        </div>
        <hr />
        <div>
          <Typography
            variant={"h5"}
            style={{ marginBottom: "15px", fontSize: "1.125rem" }}>
            Job Description
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h6"}
            style={{
              marginBottom: "15px",
              fontSize: "10pt",
              fontWeight: "400",
            }}>
            {jobData.jobDescription.moreInfo}
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h5"}
            style={{
              marginBottom: "10px",
              fontSize: "10pt",
              wordWrap: "break-word",
            }}>
            Requirement
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h6"}
            style={{
              marginBottom: "15px",
              fontSize: "10pt",
              fontWeight: "400",
            }}>
            {jobData.jobDescription.requirement}
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h5"}
            style={{
              marginBottom: "10px",
              fontSize: "10pt",
              wordWrap: "break-word",
            }}>
            Responsibilities
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h6"}
            style={{
              marginBottom: "15px",
              fontSize: "10pt",
              fontWeight: "400",
            }}>
            {jobData.jobDescription.responsibilites}
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h5"}
            style={{
              marginBottom: "10px",
              fontSize: "10pt",
              wordWrap: "break-word",
            }}>
            Compensation{" "}
          </Typography>
        </div>
        <div>
          <Typography
            variant={"h6"}
            style={{
              marginBottom: "15px",
              fontSize: "10pt",
              fontWeight: "400",
            }}>
            ${jobData.jobDescription.compensation}
          </Typography>
        </div>
        {/* <FullJobDescription jobData={jobData} /> */}
      </Box>
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

export default EachJobDetails;
