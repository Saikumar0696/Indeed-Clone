/* eslint-disable eqeqeq */
import React, { Component } from "react";
import Chart from "react-apexcharts";
import "./style.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getTopRatedCeos,
  } from "../../Redux/Actions/AdminAction";
  
export default function LineGraph1() {
    const dispatch = useDispatch();
    const { TopRatedCeos } = useSelector(
        (state) => state.TopRatedCeos
      );
    useEffect(() => {
        dispatch(getTopRatedCeos());
     }, [])
 console.log(TopRatedCeos);
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
          text: "Top 10 CEOs based on rating",
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
              x: TopRatedCeos ? (TopRatedCeos[0].aboutTheCompany.ceo) : "",
              y:  TopRatedCeos ? TopRatedCeos[0].averageRating : 0,

            },
            {
              x: TopRatedCeos ? (TopRatedCeos[1].aboutTheCompany.ceo) : "",
              y: TopRatedCeos ? TopRatedCeos[1].averageRating  : 0
            },
            {
              x: TopRatedCeos ? (TopRatedCeos[2].aboutTheCompany.ceo) : "",
              y: TopRatedCeos ? TopRatedCeos[2].averageRating  : 0
            },
            {
              x: TopRatedCeos ? (TopRatedCeos[3].aboutTheCompany.ceo) : "",
              y: TopRatedCeos ? TopRatedCeos[3].averageRating  : 0
            },
            {
              x: TopRatedCeos ? (TopRatedCeos[4].aboutTheCompany.ceo) : "",
              y: TopRatedCeos ? TopRatedCeos[4].averageRating   : 0
            },
            {
              x: TopRatedCeos ? (TopRatedCeos[5].aboutTheCompany.ceo) : "",
              y: TopRatedCeos ? TopRatedCeos[5].averageRating : 0
            },
            {
              x: TopRatedCeos && TopRatedCeos[6] ? (TopRatedCeos[6].aboutTheCompany.ceo) : "",
              y: TopRatedCeos && TopRatedCeos[6]? TopRatedCeos[6].averageRating  : 0
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


