import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "10%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  headdiv: {
    display: "flex",
    flexDirection: "row",
    height: "150%",
    marginTop: "8%",
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
  homeLogo: {
    height: "112%",
    width: "76%",
  },
  inddedLogo: {
    height: "40px",
    paddingRight: "30px",
  },
  h1: {
    fontWeight: "500",
    fontSize: "56px",
    fontFamily:
      "Noto Sans, Helvetica Neue , Helvetica, Arial, Liberation Sans, Roboto, Noto, sans-serif",
  },
  h5: {
    fontSize: "18px",
    fontWeight: "100",
    fontFamily:
      "Noto Sans, Helvetica Neue , Helvetica, Arial, Liberation Sans, Roboto, Noto, sans-serif",
  },
  h2: { fontSize: "24px", fontWeight: "bolder" },
  button1: {
    width: "32%",
    borderRadius: "8px",
    fontWeight: "700",
    height: "20%",
    backgroundColor: "#2557A7",
    color: "white",
  },

  link: {
    paddingRight: "40px",
    color: "white",
  },
}));

function EmployerLandingPage() {
  const classes = useStyles();

  const isAuth = useSelector((state) => state.login.isAuth);

  return (
    <>
      {!isAuth && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}>
            <div className={classes.headdiv} style={{ flex: 1 }}>
              <div
                style={{
                  flex: 1,
                  marginLeft: "15%",
                  marginTop: "1%",
                  alignContent: "center",
                }}>
                <h1 className={classes.h1}>You're here to hire. </h1>
                <h1 className={classes.h1}>We're here to help.</h1>
                <br />
                <h5>Post your job, interview candidates, and</h5>
                <h5>make offers all on Indeed. Start hiring today.</h5>
                <br />
                <Link
                  style={{ textDecoration: "none" }}
                  to={{ pathname: "/login", state: "" }}>
                  <Button className={classes.button1} variant='contained'>
                    Post a Job
                  </Button>
                </Link>
              </div>
              <div style={{ flex: 1 }}>
                <img
                  className={classes.homeLogo}
                  src='/Images/Employer_Home_logo.png'
                  alt=''
                />
              </div>
            </div>
          </div>
          <div style={{ marginTop: "6%", marginLeft: "15%" }}>
            <h2 className={classes.h2}>Welcome to Indeed</h2>
          </div>
          <div style={{ marginTop: "1%", marginLeft: "15%" }}>
            <h1 className={classes.h1}>
              Manage your hiring from start to finish
            </h1>
          </div>
        </div>
      )}
      {/* <Grid
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
        </Grid> */}

      {/* // : <Redirect to='/' /> */}
    </>
  );
}

export default EmployerLandingPage;
