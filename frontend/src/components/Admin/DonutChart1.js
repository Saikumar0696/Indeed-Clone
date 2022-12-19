
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Pie, Doughnut } from "react-chartjs-2";
import {
    getTopAcceptedJobseekers,
  } from "../../Redux/Actions/AdminAction";

export default function DonutChart1(props) {
    const dispatch = useDispatch();
    let state = {};
    const { topAcceptedJobseeker } = useSelector(
        (state) => state.TopAcceptedJobseekers
      ); 
      if(topAcceptedJobseeker){
      let labels = topAcceptedJobseeker.map((el) => el["firstName"]);
       console.log(labels);
      let numbers = topAcceptedJobseeker.map((el) =>
        el.noOfAcceptedReviews
      );
      console.log(numbers);
       state = {
        labels,
        datasets: [
          {
            label: "Arm Sales",
            data: numbers,
            backgroundColor: ["#0000CD", "#0000FF", "#4169E1", "#4682B4", "#6495ED"],
            hoverBackgroundColor: [
              "#00008B",
              "#000080",
              "#191970",
              "#7B68EE",
              "#6A5ACD",
            ]
          }
        ]
      };
    }
  
    useEffect(() => {
        dispatch(getTopAcceptedJobseekers());
      }, []);
    const formatNumber = (num) => {
        debugger;
      return num.toString("").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return (
      <div>
        <Pie
          data={state}
          width={450}
          height={400} 
          radius={110}
          innerRadius={20}
          backgroundColor={'blue'}
          options={{
            title: {
              display: true,
              text: "Top 5 job seekers based on total accepted reviews made",
              fontSize: 15
            },
            // responsive: true,
            legend: {
              display: true,
              position: "bottom",
              labels: {
                fontSize: 20, //labels font size
                fontColor: "#000"
              }
            },
            plugins: {
              datalabels: {
                font: {
                  size: 100
                }
              }
            },
            tooltips: {
              bodyFontSize: 20,
              callbacks: {
                label: function (tooltipItem, data) {
                  // console.log({ tooltipItem, data });
                  const label = data.labels[tooltipItem.index]; //index gives the the index of this data item in the dataset
                  // console.log(data.labels[2])
                  const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]; //finding the matching data item in dataset
                

                  return `${label}: ${value}`;
                }
              }
            }
          }}
        />
      </div>
    );
}
