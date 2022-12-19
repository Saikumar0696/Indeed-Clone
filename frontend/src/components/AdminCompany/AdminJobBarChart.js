import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { Stack, Animation } from "@devexpress/dx-react-chart";
import { useDispatch, useSelector } from "react-redux";
import { employerBarReports } from "../../Redux/Actions/EmployerReportsAction";

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

function AdminJobBarChart({ empid }) {
  const employerReport = useSelector((state) => state.employerReport);
  const { role, userId } = useSelector((state) => state.login.userDetails);
  const { clicked, setClicked } = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let currDate = new Date();
    let year = currDate.getFullYear();
    dispatch(employerBarReports(empid, year));
  }, [clicked]);

  let chartData = [];
  if (employerReport.responseFromServerBar !== null) {
    chartData = employerReport.responseFromServerBar;
  }

  return (
    <Paper style={{ width: "50%" }}>
      <Chart data={chartData}>
        <ArgumentAxis />
        <ValueAxis />

        <BarSeries
          name='Applicants Applied'
          valueField='applied'
          argumentField='jobTitle'
          color='#42A5F5'
        />
        <BarSeries
          name='Applicants Rejected'
          valueField='rejected'
          argumentField='jobTitle'
          color='#FF7043'
        />
        <BarSeries
          name='Applicants Selected'
          valueField='selected'
          argumentField='jobTitle'
          color='#9CCC65'
        />
        <Animation />
        <Legend position='bottom' rootComponent={Root} labelComponent={Label} />
        <Title text='Jobs 2021' />
        <Stack />
      </Chart>
    </Paper>
  );
}
export default AdminJobBarChart;
