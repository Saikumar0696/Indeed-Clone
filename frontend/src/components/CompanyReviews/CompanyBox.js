import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  cursorPointer: {
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export function CompanyBox({
  logo,
  rating,
  name,

  id,
  noOfRatings,
}) {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/company/${id}/snapshot`);
  };

  return (
    <Grid
      item
      container
      lg={4}
      md={4}
      sm={6}
      xs={12}
      style={{ display: "flex", border: "1px solid #f2f2f2", padding: "20px" }}
    >
      {/* <Grid item>
        <img
          src={logo}
          alt={name}
          width="50px"
          style={{ marginLeft: "10px" }}
        />
      </Grid> */}

      <Grid item container>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Typography
            className={classes.cursorPointer}
            onClick={() => handleClick(id)}
            variant="h6"
          >
            {name}
          </Typography>
        </Grid>
        <Grid
          item
          container
          lg={12}
          md={12}
          sm={12}
          xs={12}
          style={{ marginTop: "15px" }}
        >
          <Grid item lg={6} md={6} sm={6} xs={6}>
            {rating}
            <StarIcon style={{ color: "#9d2b6b" }} />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            {noOfRatings} Reviews
          </Grid>
        </Grid>
      </Grid>
      <Grid item container style={{ marginTop: "15px" }}>
        <Grid
          className={classes.cursorPointer}
          item
          lg={4}
          md={4}
          sm={4}
          xs={4}
          onClick={() => history.push(`/company/${id}/salaries`)}
        >
          Salaries
        </Grid>
        <Grid
          className={classes.cursorPointer}
          item
          lg={4}
          md={4}
          sm={4}
          xs={4}
          onClick={() => history.push(`/company/${id}/reviews`)}
        >
          Reviews
        </Grid>
        <Grid
          className={classes.cursorPointer}
          item
          lg={4}
          md={4}
          sm={4}
          xs={4}
          onClick={() => history.push(`/company/${id}/jobs`)}
        >
          Open Jobs
        </Grid>
      </Grid>
    </Grid>
  );
}
