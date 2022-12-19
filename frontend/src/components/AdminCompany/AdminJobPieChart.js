import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  PieSeries,
  Title,
  BarSeries,
  ValueAxis,
  ArgumentAxis,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import {
  Box,
  makeStyles,
  Typography,
  Container,
  Grid,
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Stack, Animation } from "@devexpress/dx-react-chart";
import { withStyles } from "@material-ui/core/styles";

import AdminJobBarChart from "./AdminJobBarChart";
import { employerPieReports } from "../../Redux/Actions/EmployerReportsAction";
const legendStyles = () => ({
  root: {
    display: "flex",
    margin: "auto",
    flexDirection: "row",
  },
});
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: "nowrap",
  },
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
  legendLabelBase
);
const theme = createMuiTheme({
  palette: {
    backgroundColor: {
      xs: "red",
      sm: "blue",
      md: "green",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: "black",
  },
  container1: {
    backgroundColor: "#f2f2f2",
    padding: "20px",
  },

  container: {
    top: "20%",
    marginLeft: "25%",
    alignSelf: "flex-start",
    border: "1px solid white",
    padding: "20px",
    flex: "1",
    borderRadius: "10px ",
    width: "45%",
    marginTop: "2%",
    fontFamily: "Noto Sans,Helvetica Neue, Helvetica, Arial, sans-serif",
    backgroundColor: "white",
  },

  boxImg: {
    width: "450px",
    display: "flex",
    height: "40px",
    justifyContent: "center",
    margin: "60px 0 30px",
  },
  imgLogo: {
    height: "150px",
    width: "300px",
  },
  boxForm: {
    backgroundColor: "#ffffff",
    width: "50%",
    marginLeft: "20%",
  },
  "@global": {
    body: {
      [theme.breakpoints.up("md")]: {
        backgroundColor: theme.palette.background.md,
      },
    },
  },
}));

function AdminJobPiChart(props) {
  // Sample data
  const classes = useStyles();
  const isAuth = useSelector((state) => state.login.isAuth);
  const employerReport = useSelector((state) => state.employerReport);
  const { role, userId } = useSelector((state) => state.login.userDetails);
  const { clicked, setClicked } = useState(false);

  const dispatch = useDispatch();

  // Data from backend
  //   const data = [
  //       {_id: "applied", count: 5}
  //   ]
  let data = [];

  useEffect(() => {
    let currDate = new Date();
    let year = currDate.getFullYear();
    dispatch(employerPieReports(props.match.params.empid, year));
  }, [clicked]);

  if (employerReport.responseFromServerPie !== null) {
    data = employerReport.responseFromServerPie;
  }

  return (
    <>
      {/* {(!isAuth || role !== 1 || role !== 2) && <Redirect to='/login' />} */}

      <Container className={classes.container1} maxWidth='xl'>
        <Box className={classes.container} sx={{ borderRadius: 16 }}>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item xs={6}>
              <Typography className={classes.h4} variant='h4'>
                Jobs Report
              </Typography>
            </Grid>
            <br />
            <Grid item xs={6}>
              <img
                className={classes.imgLogo}
                src='/Images/Employer_Reports_Logo.png'
                alt=''
              />
            </Grid>
          </Grid>
        </Box>
        <ThemeProvider theme={theme}>
          <Container
            style={{ display: "flex", flexDirection: "row", marginTop: "4%" }}>
            <Paper style={{ width: "50%" }}>
              <Chart data={data}>
                <PieSeries
                  valueField='count'
                  argumentField='_id'
                  name='Applicants Selected'
                />
                <Title text='Total Applicants 2021' />
                <Animation />
                <Legend />
              </Chart>
            </Paper>{" "}
            <Typography
              variant='h5'
              component='h2'
              style={{ marginLeft: "4%", flex: "4" }}></Typography>
            <AdminJobBarChart empid={props.match.params.empid}/>
          </Container>
        </ThemeProvider>
      </Container>
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

export default AdminJobPiChart;
