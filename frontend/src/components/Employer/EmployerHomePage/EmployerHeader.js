import React, { useState } from "react";
import { Typography, Button } from "@material-ui/core";
import { makeStyles, AppBar, Toolbar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { employerLogout } from "../../../Redux/Actions/EmployerSignOutAction";
import EmployerMenu from "./EmployerMenu";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "flex-end",

    flexDirection: "row",
    alignItems: "center",
  },

  inddedLogo: {
    height: "45px",
    paddingRight: "1%",
  },
  button: {
    width: "100px",
    borderRadius: "15px",
    height: "40px",
    backgroundColor: "#2557A7",
    color: "white",
  },
  button1: {
    width: "140px",
    borderRadius: "15px",
    height: "60px",
    backgroundColor: "#2557A7",
    color: "white",
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
  link: {
    paddingRight: "30px",
    color: "white",
    textDecoration: "none",
  },
  header_container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header_left: {
    display: "flex",
  },
  header_right: {
    display: "flex",
    width: "10%",
    justifyContent: "space-between",
  },
  button2: {
    marginRight: "20%",
  },
  navlinks: {},
}));

function EmployerHeader() {
  const classes = useStyles();
  const isAuth = useSelector((state) => state.login.isAuth);
  const { role } = useSelector((state) => state.login.userDetails);
  const [redirectLanding, setLanding] = useState(null);

  const dispatch = useDispatch();
  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(employerLogout());
    setLanding(<Redirect to='/employer/' />);
  };
  return (
    <AppBar
      position='static'
      style={{
        background: "#2D2D2D",
        display: "flex",
        flexDirection: "row",
      }}>
      {redirectLanding}
      <Toolbar
        variant='dense'
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          minHeight: "64px",
        }}>
        <div style={{ flex: 6 }}>
          <Typography
            to='/employer/home/619f0cdd8188bc6c174294cf/company'
            component={NavLink}
            className={classes.link}>
            <img
              className={classes.inddedLogo}
              src='/Images/Indeed_Employer_logo.png'
              alt=''
            />
          </Typography>

          {isAuth && role === 1 && (
            <>
              <Typography
                to='/employer/jobs-posted/'
                component={NavLink}
                className={classes.link}>
                Post a Job
              </Typography>
              <Typography
                to='/employer/company/update'
                component={NavLink}
                className={classes.link}>
                Company
              </Typography>
              <Typography
                to='/employer/reports'
                component={NavLink}
                className={classes.link}>
                Reports
              </Typography>
              <Typography
                to='/employer/reviews'
                component={NavLink}
                className={classes.link}>
                Reviews
              </Typography>
            </>
          )}
        </div>
        <div style={{ flex: 1 }}>
          {!isAuth ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                to='/login'
                component={NavLink}
                className={classes.button2}
                style={{ textDecoration: "none" }}>
                <Button className={classes.button} variant='contained'>
                  Sign In
                </Button>
              </Typography>
              <Typography
                to='/'
                component={NavLink}
                className={classes.link}
                style={{ paddingRight: "0%" }}>
                Find Jobs
              </Typography>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <EmployerMenu />
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default EmployerHeader;
