import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCompanySalaries } from "../../Redux/Actions/SalaryAction";
import { useSelector } from "react-redux";
import {
  Container,
  makeStyles,
  Grid,
  Typography,
  Button,
  withStyles,
  InputAdornment,
  TextField,
  FormHelperText,
  ListItem,
} from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "aliceblue",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  boxSearch: {
    backgroundColor: "white",
    margin: 0,
    height: "310px",
    backgroundPosition: "bottom right",
    backgroundImage: "url(/Images/companyreview.PNG)",
    backgroundRepeat: "no-repeat",
  },
  outerSearchGrid: {
    marginTop: "50px",
    flexDirection: "column",
    alignContent: "flex-end",
  },
  h3: {
    fontWeight: "bold",
    marginBottom: "20px",
  },
  h5: {
    color: "#6f78a5",
    fontWeight: "400",
    marginBottom: "70px",
  },
  outlinedInput: {
    border: "2px solid #cccccc",
    borderRadius: "10px",
    width: "450px",
  },
  formhelperText: {
    color: "#085ff7",
    paddingLeft: "20px",
    cursor: "pointer",
  },
  companiesHiring: {
    marginTop: "50px",
    marginBottom: "20px",
    backgroundColor: "white",
    display: "flex",
  },
}));

export const SearchButton = withStyles((theme) => ({
  root: {
    color: "#ffffff",
    backgroundColor: "#085ff7",
    cursor: "pointer",
    width: "200px",
    borderRadius: "200px",
    height: "53px",
    marginLeft: "50px",
    "&:hover": {
      backgroundColor: "#0542ac",
    },
  },
}))(Button);

export function FindSalaries() {
  const [jobTitle, setjobTitle] = useState("");
  const [location, setlocation] = useState("");
  const [filterValue, setFilterValue] = useState(false);
  const [filteredSalaries, setFilterSalaries] = useState([]);
  const [displayTitle, setDisplayTitle] = useState("");
  const [averageSalary, setaverageSalary] = useState(0);
  let { companySalaries } = useSelector((state) => state.salary);
  const onTextChange = (e) => {
    setjobTitle(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (jobTitle && location) {
      let arr = companySalaries.filter(
        (row) =>
          row.jobLocation.toLowerCase().indexOf(location.toLowerCase()) > -1
      );

      arr = arr.filter(
        (row) => row.jobTitle.toLowerCase().indexOf(jobTitle.toLowerCase()) > -1
      );
      setFilterSalaries(arr);
      console.log(arr);
      const average =
        arr.reduce((total, next) => total + parseInt(next.currentPay), 0) /
        arr.length;
      console.log(average);
      setaverageSalary(average);
      setDisplayTitle(arr.length > 0 ? arr[0].jobTitle : "");
      setFilterValue(true);
    }
  };

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanySalaries());
    setFilterValue(false);
  }, [dispatch]);

  return (
    <div>
      <Container className={classes.container} maxWidth="xl">
        <Grid container className={classes.boxSearch}>
          <Grid
            item
            container
            className={classes.outerSearchGrid}
            xs={6}
            sm={6}
            md={10}
            lg={11}
            xl={7}
          >
            <Grid item>
              <Typography className={classes.h3} variant="h5">
                Find a career you'll love
              </Typography>
              <Typography variant="h6">
                Explore which careers have the highest job satisfaction, best
                salaries, and more
              </Typography>
            </Grid>
            <Grid>
            <form onSubmit={handleSubmit} style={{ display: "flex" }}>
              <Grid item>
                <TextField
                  className={classes.outlinedInput}
                  type="text"
                  variant="outlined"
                  placeholder="Job Title"
                  value={jobTitle}
                  onChange={onTextChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  className={classes.outlinedInput}
                  type="text"
                  variant="outlined"
                  placeholder="Enter Company Location"
                  required
                  value={location}
                  onChange={(e) => {
                    setlocation(e.target.value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <SearchButton type="submit" variant="contained">
                  Search
                </SearchButton>
              </Grid>
            </form>

            </Grid>
            
          </Grid>
        </Grid>
      </Container>
      {filterValue && (
        <div>
          {" "}
          <h2>
            Average Salary of {displayTitle} in {location} is {averageSalary}
          </h2>
          <h1>Top Companies</h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Salary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSalaries.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.companyName}
                    </TableCell>
                    <TableCell>{row.currentPay}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}
