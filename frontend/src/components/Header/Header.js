import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ForumIcon from "@material-ui/icons/Forum";
import { NavLink } from "react-router-dom";
import { Box, Container } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import UserMenu from "./UserMenu";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  toolbar: {
    minHeight: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    height: "20px",
  },
  title: {
    flexGrow: 1,
    alignSelf: "flex-end",
  },
  navigation: {
    width: "350px",
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "30px",
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
    width: "350px",
    justifyContent: "space-between",
  },
  link: {
    marginLeft: "14px",
    "& a": {
      marginLeft: "20px",
    },
  },
}));

export default function Header() {
  const dispatch = useDispatch();
  const classes = useStyles();
  let isAuth = useSelector((state) => state.login.isAuth);
  let role = useSelector((state) => state.login.userDetails.role);
  if (!localStorage.getItem("token")) {
    isAuth = false;
  } else {
    isAuth = true;
  }

  return (
    <div className={classes.root}>
      <AppBar elevation={0} color={"secondary"} position='static'>
        <Toolbar className={classes.toolbar}>
          <Container
            className={classes.header_container}
            disableGutters
            maxWidth={false}>
            {role !== 2 ? (
              <Box className={classes.header_left}>
                <Link to='/'>
                  <img
                    className={classes.logo}
                    src='/Images/Indeed_logo.png'
                    alt=''
                  />
                </Link>
                <Box
                  className={classes.link}
                  display={{ xs: "none", sm: "block", md: "block" }}>
                  <Typography component={NavLink} variant='h6' to='/'>
                    Find Jobs
                  </Typography>
                  <Typography
                    component={NavLink}
                    variant='h6'
                    to='/indeed/companyreviews'>
                    Company Reviews
                  </Typography>
                  <Typography
                    component={NavLink}
                    variant='h6'
                    to='/indeed/find-salaries'>
                    Find Salary
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box className={classes.header_left}>
                <Link to='/indeed/allcompanies'>
                  <img
                    className={classes.logo}
                    src='/Images/Indeed_logo.png'
                    alt=''
                  />
                </Link>

                <Box
                  className={classes.link}
                  display={{ xs: "none", sm: "block", md: "block" }}>
                  <Typography
                    component={NavLink}
                    variant='h6'
                    to='/indeed/allcompanies'>
                    Find Company
                  </Typography>
                  <Typography
                    component={NavLink}
                    variant='h6'
                    to='/admindashboard'>
                    Analytics
                  </Typography>
                </Box>
              </Box>
            )}
            {isAuth || role === 2 ? (
              <Box className={classes.header_right}>
                <Link to='/indeed/messages'>
                  <IconButton
                    edge='start'
                    color='inherit'
                    aria-label='open drawer'>
                    <ForumIcon />
                  </IconButton>
                </Link>
                <IconButton
                  edge='start'
                  color='inherit'
                  aria-label='open drawer'>
                  <NotificationsIcon />
                </IconButton>
                <UserMenu />
                <Typography
                  style={{ display: "flex", alignItems: "center" }}
                  component={NavLink}
                  variant='h6'
                  to='/'>
                  Employers/jobs
                </Typography>
              </Box>
            ) : (
              <Box className={classes.header_right}>
                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#0039C0",
                  }}
                  component={NavLink}
                  variant='h6'
                  to='/'>
                  Upload your resume
                </Typography>
                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#0039C0",
                  }}
                  component={NavLink}
                  variant='h6'
                  to='/login'>
                  Sign in
                </Typography>
                <Typography
                  style={{ display: "flex", alignItems: "center" }}
                  component={NavLink}
                  variant='h6'
                  to='/employer'>
                  Employers/jobs
                </Typography>
              </Box>
            )}
          </Container>
        </Toolbar>
      </AppBar>
      <hr />
    </div>
  );
}
