import React from 'react';
import Header from '../Header/Header';
import DonutChart from "./DonutChart";
import DonutChart1 from "./DonutChart1";
import "./style.css";
import { BarChart } from "react-d3-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getTopRatedCompanies,
  } from "../../Redux/Actions/AdminAction";
  import { getTopViewCount } from "../../Redux/Actions/AdminAction";
import LineGraph from './LineGraph';
import LineGraph1 from './LineGraph1';
import PieChart from './PieChart';
import {Login} from '../Login/Login';
import {
  Select,
  FormControl,
  MenuItem,
  makeStyles,

} from "@material-ui/core";
const useStyle = makeStyles((theme) => ({

  input: {
    width: "100%",
    height: "45px",
  },
  
  outlinedInput: {
    width: "700px",
  },
  
  
  
}));

function Admindashboard() {
    const dispatch = useDispatch();
    const classes = useStyle();
    const loginReducer = useSelector((state) => state.login);
    const { isAuth, userDetails } = loginReducer;
    const [filterValue, setfilterVlaue] = useState("Friday");
    const { topCompanyRatings } = useSelector(
        (state) => state.TopRatingCompanies
      );
      const { topViewCounts } = useSelector(
        (state) => state.getTopViewCount
      );

      const [values, setValues] = React.useState([
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ]);
      let data;
      let data1; 
      console.log(topCompanyRatings);
      if(topCompanyRatings){


        data = [
            {
              label: "Expert",
              values: [
                { x: (topCompanyRatings[0].companyName ), y: topCompanyRatings[0].averageRating },
                { x: (topCompanyRatings[1].companyName), y: topCompanyRatings[1].averageRating },
                { x: (topCompanyRatings[2].companyName), y: topCompanyRatings[2].averageRating },
                { x: (topCompanyRatings[3].companyName), y: topCompanyRatings[3].averageRating },
                { x: (topCompanyRatings[4].companyName), y: topCompanyRatings[4].averageRating },
              ]
            }
          ];
         
      }
      if(topViewCounts){
        data1 = [
            {
              label: "Expert",
              values: []
            }
          ];
         debugger;

            for(let i=0; i < topViewCounts.length; i++ ){
              let temp = {};
              temp.x = topViewCounts[i].companyName;
              if(topViewCounts[i].views){
              let temp2 = topViewCounts[i].views.filter((val) => val.day === filterValue);
              if(temp2.length)
              temp.y = temp2[0].count;
              data1[0].values.push(temp);
              }
              
          }
      if(data1[0].values.length === 0){
        let temp = {x: "", y: 0};
        data1[0].values.push(temp);
      }
        }

     
     const handlefilterChange = (e) => {
      setfilterVlaue(e.target.value);
      dispatch(getTopViewCount({day: e.target.value}));
     }
    useEffect(() => {
       dispatch(getTopRatedCompanies());
       dispatch(getTopViewCount({day: "Friday"}));
    }, [])
    return (
      <>
      {userDetails && userDetails.role === 2 ? (
        <div>
            <Header />
            <div class="container" style={{ backgroundColor: 'rgb(181 183 245)', minHeight: '45rem', border: '1px solid #d0d0e1'}}>
              <h3 style={{textAlign: "center", color: 'darkslategrey', fontFamily: "cursive"}}> Analystics</h3>
             
              <div className="row">
                <div className="col md-12 lg-12" style={{backgroundColor: "rgb(181 183 245)" }}>
                <LineGraph1 />
                </div>
       
              </div>
            <div className="row">
               <div className="col md-2 lg-2" style={{backgroundColor: '#dce5f5'}}>
                    <DonutChart />
                 </div>
                 <div className="col md-2 lg-2" style={{backgroundColor: "rgb(99 99 247)"}}>
                 <h6>Top 5 companies based on average rating</h6>
                 <BarChart
        data={data}
        width={350}
        height={350}
        margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
      />
                   
                 </div>
            </div>
            <div className="row">
               <div className="col md-2 lg-2" id="chart" style={{backgroundColor: "rgb(146 146 227)"}}>
               <LineGraph />
              

                 </div>
                 <div className="col md-3 lg-3" style={{backgroundColor: "#b8c2d9"}}>
                 <DonutChart1 />
                 </div>
            </div>
            <div className="row">
               <div className="col md-2 lg-2" id="chart">
               {/* <PieChart /> */}

                 </div>
                 <div className="col md-3 lg-3">
                 </div>
            </div>
            <div class="row"> 
            <div className="col md-11 lg-11" style={{backgroundColor: "rgb(131 142 215)"}}>
            <h6 style={{textAlign: "center"}}> Top 10 companies based on number of views</h6>
            <FormControl>
            <Select
            className={classes.outlinedInput}
            variant='outlined'
            value={filterValue}
            name='filterVal'
            onChange={handlefilterChange}
            style={{ height: "30px", width: "189px" }}
          >
            {values.map((value, index) => {
              return <MenuItem value={value}>{value}</MenuItem>;
            })}
          </Select>

            </FormControl>
            <BarChart
        data={data1}
        width={600}
        height={300}
        margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
      />
                </div>
            </div>
           
            </div>

            
        </div>
      ): (<Login/>)}
        
        </>
    );
}

export default Admindashboard