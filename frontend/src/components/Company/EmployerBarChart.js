import * as React from "react";
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

// export const data = [
//   {
//     country: "Back end Developer",
//     gold: 36,
//     silver: 38,
//     bronze: 36,
//   },

//   {
//     country: "Frontend Engineer",
//     gold: 23,
//     silver: 21,
//     bronze: 28,
//   },
//   {
//     country: "Mechincal Engineer",
//     gold: 14,
//     silver: 15,
//     bronze: 17,
//   },
//   {
//     country: "Mechincal Engineer",
//     gold: 14,
//     silver: 15,
//     bronze: 17,
//   },
//   {
//     country: "Mechincal Engineer",
//     gold: 14,
//     silver: 15,
//     bronze: 17,
//   },
//   {
//     country: "Software Engineer",
//     gold: 16,
//     silver: 10,
//     bronze: 15,
//   },
//   {
//     country: "Software Engineer",
//     gold: 16,
//     silver: 10,
//     bronze: 15,
//   },
// ];

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

function EmployerBarChart() {
  const chartData = [
    {
      country: "Back end ",
      gold: 36,
      silver: 38,
      bronze: 36,
    },

    {
      country: "Frontend Engineer",
      gold: 23,
      silver: 21,
      bronze: 28,
    },

    {
      country: "Mechincal",
      gold: 14,
      silver: 15,
      bronze: 17,
    },
    {
      country: "C Engineer",
      gold: 14,
      silver: 15,
      bronze: 17,
    },
    {
      country: "Software Engineer",
      gold: 16,
      silver: 10,
      bronze: 15,
    },
    {
      country: "W Engineer",
      gold: 16,
      silver: 10,
      bronze: 15,
    },
    {
      country: "G Engineer",
      gold: 16,
      silver: 10,
      bronze: 15,
    },
  ];
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
          name='Applicants Selected'
          valueField='rejected'
          argumentField='jobTitle'
          color='#9CCC65'
        />
        <BarSeries
          name='Applicants Rejected'
          valueField='selected'
          argumentField='jobTitle'
          color='#FF7043'
        />
        <Animation />
        <Legend position='bottom' rootComponent={Root} labelComponent={Label} />
        <Title text='Jobs 2020' />
        <Stack />
      </Chart>
    </Paper>
  );
}
export default EmployerBarChart;
