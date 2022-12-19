import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  makeStyles,
  AppBar,
  Button,
} from "@material-ui/core";
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
import {getJobApplicants, getUserProfile} from "../../../Redux/Actions/JobsAction";
import { Redirect } from "react-router-dom";

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
  indeedLogo: {
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
  formHelperText: {
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
  cardLook: {
    width: "100%",
    // marginLeft: "2%",
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
  eachRow: {
    flex: "1",
  },
}));

const EmployerJobApplicants = ({ match }) => {
  const classes = useStyles();

  const { jobId, employerId } = match.params

  const theme = createMuiTheme({
    palette: {
      background: {
        default: "#303030",
      },
    },
  });

  const profile = useSelector(state=>state.jobs.profile);

  const createData = (userId, applicantEmail,applicantStatus, applicantResume, applicantCv) => {
    return { userId, applicantEmail,applicantStatus, applicantResume, applicantCv };
  };

  const dispatch = useDispatch();

  const jobApplicants = useSelector((state) => state.jobApplicants);
  const { error, applicants } = jobApplicants;

  let rows = [];

  if (!error && applicants && applicants.length > 0) {
    rows = applicants.map((eachApplicant) => {
      return createData(eachApplicant.userId, eachApplicant.emailId, eachApplicant.status, eachApplicant.resume, eachApplicant.cv);
    });
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(getJobApplicants(jobId, employerId));
  }, [match]);

  const columns = [
    { id: "Applicant Email", label: "Applicant Email" },
    { id: "Application Status", label: "Application Status" },
    { id: "View Resume", label: "View Resume" },
    { id: "View CV", label: "View CV" },
    { id: "Message", label: "Send Message" }
  ];

  return (
    <>

      <div style={{ height: 400, width: "80%", marginLeft: "10%", marginTop: "2%"}}>
        <Paper className={classes.root}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      className={classes.tableHeader}>
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
                      <TableRow role='checkbox' tabIndex={-1} key={row.code}>
                        <TableCell style={{ flex: 3 }}>
                          <Link
                              style={{ textDecoration: "none" }}
                              to={{
                                pathname: `/employer/applicant-profile/${row.userId}&${jobId}&${employerId}`,
                                state: {},
                              }}>
                            <Typography variant='h5' component='h2'>
                              {row.applicantEmail}
                            </Typography>
                          </Link>
                        </TableCell>
                        <TableCell style={{ flex: 1 }}>
                          <Typography variant='h5' component='h2' align='inherit'>
                            {row.applicantStatus==="applied" ? "Applied" : row.applicantStatus}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ flex: 1 }}>
                          <Button
                            variant='outlined'
                            color='#065FF7'
                            style={{ color: "#065FF7" }}>
                            <Typography>
                              {row.resume &&
                                  <Link to={"/"+row.resume.split("\\")[3]} target="_blank" download style={{marginTop:"10px"}}>
                                    Download your resume here {' '}
                                    <i className="fa fa-download" />
                                  </Link>
                              }
                              View Resume
                            </Typography>
                          </Button>
                        </TableCell>
                        <TableCell style={{ flex: 1 }}>
                          <Button
                              variant='outlined'
                              color='#065FF7'
                              style={{ color: "#065FF7" }}>
                            <Typography>
                              {row.resume &&
                                  <Link to={"/"+row.resume.split("\\")[3]} target="_blank" download style={{marginTop:"10px"}}>
                                    Download your resume here {' '}
                                    <i className="fa fa-download" />
                                  </Link>
                              }
                              View CV
                            </Typography>
                          </Button>
                        </TableCell>
                        <TableCell style={{ flex: 1 }}>
                          <Button
                            variant='outlined'
                            color='#065FF7'
                            style={{ color: "#065FF7" }}>
                            <Link
                              style={{ textDecoration: "none" }}
                              to={{
                                pathname: `/employer/send-message/${row.userId}&${employerId}`,
                                state: { row },
                              }}>
                              Send Message
                            </Link>
                          </Button>
                        </TableCell>
                        <TableCell style={{ flex: 1 }}>
                          <form>

                          </form>
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
    </>
  );
};

export default EmployerJobApplicants;
