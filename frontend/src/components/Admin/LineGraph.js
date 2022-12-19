/* eslint-disable eqeqeq */
import React, { Component } from "react";
import Chart from "react-apexcharts";
import "./style.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllReviews,
  } from "../../Redux/Actions/AdminAction";
export default function LineGraph() {
    const dispatch = useDispatch();
    const { AllReviews } = useSelector(
        (state) => state.AdminAllReviews
      );
    useEffect(() => {
        dispatch(getAllReviews());
     }, [])
 console.log(AllReviews);
   let state = {};
   
    state = {
      options: {
        chart: {
          id: "line-chart"
        },
        xaxis: {
          type: "Number"
        },
        stroke: {
          curve: "straight",
          width: 2
        },
        markers: {
          size: 4
        },
        title: {
          text: "Number of Reviews per day",
          align: "center"
        },
        legend: {
          position: "top",
          markers: {
            fillColors: ["", "", "gray", "gray", "gray"]
          },
          fontSize: 13,
          fontWeight: 500,
          onItemHover: {
            highlightDataSeries: true
          },
          itemMargin: {
            horizontal: 15,
            vertical: 0
          }
        },
        tooltip: {
          enabled: true,
          shared: true,
          followCursor: false,
          inverseOrder: false,
          custom: undefined,
          fillSeriesColor: false,
          theme: "dark",
          style: {
            fontSize: "12px",
            fontFamily: "Raleway"
          },
          onDatasetHover: {
            highlightDataSeries: true
          },
          x: {
            show: true,
            format: "dd MMM",
            formatter: undefined
          },
          y: {
            show: true,
            formatter: undefined,
            title: {
              formatter: (seriesName) => seriesName
            }
          }
        }
      },
      series: [
        {
          name: "Number of reviews",
          data: [
            {
              x: 'Sun',
              y:  AllReviews ? AllReviews.filter((val)=> val.postedDay === 0).length  : 0,

            },
            {
              x: 'Mon',
              y: AllReviews ? AllReviews.filter((val)=> val.postedDay === 1).length  : 0
            },
            {
              x: 'Tue',
              y: AllReviews ? AllReviews.filter((val)=> val.postedDay === 2).length  : 0
            },
            {
              x: 'Wed',
              y: AllReviews ? AllReviews.filter((val)=> val.postedDay === 3).length  : 0
            },
            {
              x: 'Thurs',
              y: AllReviews ? AllReviews.filter((val)=> val.postedDay === 4).length  : 0
            },
            {
              x: 'Fri',
              y: AllReviews ? AllReviews.filter((val)=> val.postedDay === 5).length  : 0
            },
            {
              x: 'Sat',
              y: AllReviews ? AllReviews.filter((val)=> val.postedDay === 6).length  : 0
            },
          
           
          ]
        }
      ]
    };
  

 
    return (
      <div className="dataStatistics">
        <div className="line-chart">
          <Chart
            options={state.options}
            series={state.series}
            type="line"
            width="90%"
            height="290"
          />
        </div>
      </div>
    );
  }


