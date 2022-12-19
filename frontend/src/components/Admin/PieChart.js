import React, { Component } from "react";
import Chart from "react-apexcharts";

export default function PieChart()  {
 

    const state = {
      series: [55, 20, 60],
      chartOptions: {
        labels: ["name1"]
      },
      // labels: [],

      options: {
        title: {
          text: "Top 10 CEOs Based on Rating"
        },
        chart: {
          type: "donut"
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          pie: {
            offsetX: 100,
            offsetY: 50,
            donut: {
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: "30px",
                  fontFamily: "Raleway"
                },
                value: {
                  show: true
                },
                total: {
                  show: true,
                  showAlways: true,
                  label: "Total",
                  color: "black"
                }
              }
            }
          }
        }
      }
    };
  

 
    return (
      <div className="donut">
        <Chart
          options={state.options}
          series={state.series}
          labels={state.chartOptions.labels}
          type="donut"
          width="80%"
        />
      </div>
    );
  
}
