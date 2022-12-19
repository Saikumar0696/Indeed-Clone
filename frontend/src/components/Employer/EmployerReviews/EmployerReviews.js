import React, { useState, useEffect } from "react";

import { Grid, Container } from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Rating } from "@mui/material";
import { getCompanySpecificReviews } from "../../../Redux/Actions/Company";
import { employerReviewUpdate } from "./../../../Redux/Actions/EmployerReviewAction";

const useStyles = makeStyles((theme) => ({
  container1: {
    backgroundColor: "#f2f2f2",
    paddingTop: "2%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    top: "20%",
    marginLeft: "30%",
    alignSelf: "flex-start",
    border: "1px solid white",
    padding: "20px",
    flex: "1",
    borderRadius: "10px ",
    width: "40%",
    marginTop: "2%",
    fontFamily: "Noto Sans,Helvetica Neue, Helvetica, Arial, sans-serif",
    backgroundColor: "white",
  },
  container2: {
    top: "20%",
    marginLeft: "30%",
    alignSelf: "flex-start",
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
    height: "150px",
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
  cardlook: {
    width: "100%",
    height: "60%",
    borderRadius: "10px ",

    // marginLeft: "2%",
  },
  h5: {
    fontSize: "1rem",
    fontWeight: "bold",
    fontFamily:
      "Noto Sans, Helvetica Neue , Helvetica, Arial, Liberation Sans, Roboto, Noto, sans-serif",
  },
  pos: {
    marginLeft: "5%",
  },
  h6: {
    fontSize: "1rem",
    fontWeight: "bold",
    fontFamily:
      "Noto Sans, Helvetica Neue , Helvetica, Arial, Liberation Sans, Roboto, Noto, sans-serif",
  },
}));

function EmployerReviews(props) {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);
  let { userDetails } = useSelector((state) => state.login);
  let { responseFromServer } = useSelector((state) => state.employerReview);

  const { companySpecificReviews } = useSelector(
    (state) => state.companyReviewList
  );
  useEffect(() => {
    // if (props.match.params.pathname === "reviews")
    console.log("companySpecificReviews");
    dispatch(
      getCompanySpecificReviews({
        // employerId: "619f0cdd8188bc6c174294cf", // userDetails.userId,
        employerId: userDetails.userId,
      })
    );
    console.log("payload Details ", companySpecificReviews);
  }, [props]);

  useEffect(() => {
    dispatch(
      getCompanySpecificReviews({
        // employerId: "619f0cdd8188bc6c174294cf", //userDetails.userId,
        employerId: userDetails.userId,
      })
    );
    setClicked(false);
  }, [clicked]);

  useEffect(() => {
    dispatch(
      getCompanySpecificReviews({
        // employerId: "619f0cdd8188bc6c174294cf", //userDetails.userId,
        employerId: userDetails.userId,
      })
    );
  }, [responseFromServer]);

  let rows = [];
  function createData(_id, reviewTitle, overallRating, pros, cons, isFeatured) {
    return { _id, reviewTitle, overallRating, pros, cons, isFeatured };
  }
  if (companySpecificReviews && companySpecificReviews.length > 0) {
    rows = companySpecificReviews.map((eachreview) => {
      return createData(
        eachreview._id,
        eachreview.reviewTitle,
        eachreview.overallRating,
        eachreview.pros,
        eachreview.cons,
        eachreview.isFeatured
      );
    });
  }
  const classes = useStyles();

  const featureHandler = (row) => {
    setClicked(true);
    dispatch(
      employerReviewUpdate({ _id: row._id, employerId: userDetails.userId })
    );
  };
  const isAuth = useSelector((state) => state.login.isAuth);
  const { role } = useSelector((state) => state.login.userDetails);

  return (
    <>
      {(!isAuth || role !== 1) && <Redirect to='/login' />}
      <Container className={classes.container1} maxWidth='xl'>
        <Box className={classes.container}>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item xs={6}>
              <Typography className={classes.h4} variant='h4'>
                Employee Reviews
              </Typography>
            </Grid>
            <br />
            <Grid item xs={6}>
              <img
                className={classes.imgLogo}
                src='/Images/Employer_Reviews_logo.png'
                alt=''
              />
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.container2}>
          {rows.map((row) => {
            return (
              <>
                <Card className={classes.cardlook}>
                  <CardContent>
                    <Typography style={{ display: "flex" }}>
                      <Typography
                        variant='h5'
                        component='h2'
                        style={{ flex: "1" }}>
                        <Typography className={classes.h4} variant='h4'>
                          <h4 style={{ borderBottom: "3px dotted #000" }}>
                            {row.overallRating}.0
                          </h4>
                          <Rating
                            name='size-small'
                            style={{ color: "#9d2b6b" }}
                            value={row.overallRating}
                            size='small'
                            precision={0.5}
                            readOnly
                          />
                        </Typography>
                      </Typography>
                      <br />
                      <Typography
                        variant='h5'
                        component='h2'
                        style={{ marginLeft: "4%", flex: "4" }}>
                        {row.reviewTitle}
                      </Typography>
                    </Typography>
                    <Grid
                      item
                      container
                      spacing={3}
                      style={{ marginLeft: "1%", marginTop: "3%" }}>
                      <span>
                        <i class='fas fa-check' style={{ color: "green" }}></i>
                      </span>
                      <div spacing={3}>
                        <b> Pros </b>
                      </div>
                      <br></br>
                    </Grid>
                    <br />

                    <Typography className={classes.pos} color='textSecondary'>
                      {row.pros}
                    </Typography>
                    <Grid
                      item
                      container
                      spacing={3}
                      style={{ marginLeft: "1%", marginTop: "2%" }}>
                      <i
                        class='fa fa-times'
                        aria-hidden='true'
                        style={{ color: "red" }}></i>
                      <br></br>
                      <div spacing={3}>
                        <b>Cons </b>{" "}
                      </div>
                    </Grid>
                    <br />

                    <Typography className={classes.pos} color='textSecondary'>
                      {row.cons}
                    </Typography>
                    <Typography style={{ display: "flex" }}>
                      <Typography
                        variant='h5'
                        component='h2'
                        style={{ flex: "4" }}>
                        <Typography
                          className={classes.h4}
                          variant='h4'></Typography>
                      </Typography>
                      <Typography
                        className={classes.h6}
                        variant='h6'
                        component='h6'>
                        Featured?
                      </Typography>
                      <Typography
                        variant='h5'
                        component='h2'
                        onClick={() => featureHandler(row)}>
                        {row.isFeatured && <BookmarkIcon color='Green' />}
                        {!row.isFeatured && <BookmarkBorderIcon />}
                      </Typography>
                    </Typography>
                  </CardContent>
                </Card>
                <br />
              </>
            );
          })}
        </Box>
      </Container>
      {/* <Grid
        container
        spacing={1}
        style={{
          position: "sticky",
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
    </>
  );
}

export default EmployerReviews;
