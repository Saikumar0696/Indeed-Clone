import React, { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TablePagination from "@material-ui/core/TablePagination";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { employerAllJob } from "../../../Redux/Actions/EmployerJobPostingAction";
import { Redirect } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { employerBarReports } from "./../../../Redux/Actions/EmployerReportsAction";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: "black",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
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
    width: "200px",
    borderRadius: "9px",
    height: "50px",
    color: "white",
    backgroundColor: "#065FF7",
  },

  formStyle: {
    width: "100%",
  },
  cardlook: {
    width: "100%",
  },
  tableHeader: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#065FF7",
  },
  root: {
    marginLeft: "2%",
    marginRight: "2%",
  },
  tableBody: {
    width: "100%",
    marginLeft: "2%",
    marginRight: "2%",
    display: "flex",
    flexDirection: "row",
  },
  eachrow: {
    flex: "1",
  },
}));

function EmployerJobPostingHome(props) {
  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      background: {
        default: "#303030",
      },
    },
  });

  function createData(eachjob, title, city, country) {
    return { eachjob, title, city, country };
  }
  const dispatch = useDispatch();
  const { responseFromServer } = useSelector((state) => state.employerJobs);
  const { responseFromServerBar } = useSelector(
    (state) => state.employerReport
  );
  const { userDetails } = useSelector((state) => state.login);
  const [IsWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (userDetails && userDetails.userId && userDetails.userId !== "") {
      dispatch(employerAllJob(userDetails.userId));
      dispatch(employerBarReports(userDetails.userId, 1990));
    }
    // dispatch(employerAllJob("61a07e89e5d016c47d56338a"));
  }, [props]);
  let rows = [];
  if (responseFromServer.length > 0) {
    rows = responseFromServer.map((eachjob) => {
      return createData(
        eachjob,
        eachjob.jobTitle,
        eachjob.jobLocation.city,
        eachjob.jobLocation.country
      );
    });
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const isAuth = useSelector((state) => state.login.isAuth);

  const columns = [
    { id: "Job Title", label: "Job Title" },
    {
      id: "Applicants",
      label: "Applicants",
      minWidth: 100,
    },
    {
      id: "Action",
      label: "Action",
      minWidth: 100,
    },
  ];
  const { role } = useSelector((state) => state.login.userDetails);
  console.log("responseFromServerBar ", responseFromServerBar);

  return (
    <>
      {(!isAuth || role !== 1) && <Redirect to='/login' />}
      <div
        style={{
          paddingTop: "3%",
          // backgroundColor: "#f2f2f2",
          height: "100%",
        }}>
        <MuiThemeProvider theme={theme} />
        <CssBaseline />
        <Container className={classes.container} maxWidth='xl'>
          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "3%",
            }}>
            <Grid style={{ paddingLeft: "10%" }}>
              <Typography className={classes.h4} variant='h4'>
                Jobs
              </Typography>
            </Grid>
            <Grid style={{ paddingLeft: "65%" }}>
              <Link
                style={{ textDecoration: "none" }}
                to={{ pathname: "/employer/postJob", state: "" }}>
                <Button className={classes.button} variant='contained'>
                  Post a Job
                </Button>
              </Link>
            </Grid>
          </Grid>
          <br />
          <br />
          <Grid item xs={2} style={{ paddingLeft: "80%" }}></Grid>
          <br />
          <div style={{ height: 400, width: "80%", marginLeft: "10%" }}>
            {/* {IsWarning && <Alert severity='error'>No Jobs to display!</Alert>} */}

            <Paper className={classes.root}>
              <TableContainer className={classes.tablecontainer}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className={classes.tableHeader}
                          style={{ minWidth: column.minWidth }}>
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <br />
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableBody>
                          <TableRow
                            role='checkbox'
                            tabIndex={-1}
                            key={row.code}>
                            <TableCell style={{ flex: 3 }}>
                              <Card className={classes.cardlook}>
                                <CardContent>
                                  <Typography variant='h5' component='h2'>
                                    {row.title}
                                  </Typography>
                                  <Typography
                                    className={classes.pos}
                                    color='textSecondary'>
                                    {row.city}
                                  </Typography>
                                  <Typography
                                    className={classes.pos}
                                    color='textSecondary'>
                                    {row.country}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </TableCell>
                            <TableCell style={{ flex: 1 }}>
                              <Typography
                                style={{ color: "#065FF7", fontWeight: "bold" }}
                                to={{
                                  pathname: "/employer/showJobDetails",
                                  state: { row },
                                }}>
                                {responseFromServerBar !== null &&
                                responseFromServerBar.find(
                                  (ele) =>
                                    ele.jobId.toString() ===
                                    row.eachjob._id.toString()
                                )
                                  ? responseFromServerBar.find(
                                      (ele) =>
                                        ele.jobId.toString() ===
                                        row.eachjob._id.toString()
                                    )["applied"] +
                                    responseFromServerBar.find(
                                      (ele) =>
                                        ele.jobId.toString() ===
                                        row.eachjob._id.toString()
                                    )["selected"] +
                                    responseFromServerBar.find(
                                      (ele) =>
                                        ele.jobId.toString() ===
                                        row.eachjob._id.toString()
                                    )["rejected"]
                                  : 0}

                                <span>{" Applicants"}</span>
                              </Typography>
                            </TableCell>
                            <TableCell style={{ flex: 1 }}>
                              <Button
                                variant='outlined'
                                color='#065FF7'
                                style={{ color: "#065FF7" }}>
                                <Link
                                  style={{ textDecoration: "none" }}
                                  to={{
                                    pathname: "/employer/showJobDetails",
                                    state: { row },
                                  }}>
                                  Job Details
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      );
                    })}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[2, 5, 10]}
                component='div'
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
          <br />
          <br />
        </Container>
      </div>
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
    </>
  );
}

export default EmployerJobPostingHome;
