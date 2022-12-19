import {  Box, Button, Grid, OutlinedInput, Typography} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import SearchGrid from './SearchGrid';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';
import { fetchQJobs, fetchAllJobs, fetchQueriedJobs } from '../../Redux/Actions/JobsAction';

const useStyles = makeStyles((theme) => ({
    autoComplete: {
        border: '1px solid #2D5DCE',
        borderRadius: '10px'
    },
    keywordSearch: {
        outline: 'none',
        width: '100%',
        border: 'none',
        borderRadius: '10px',
        height: '45px'
    },
    suggestions: {
        border: 'none'
      }
  }))

function Body(props) {
    const classes = useStyles();
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
      const data = {
        job: "",
        location: "",
        page: 0,
        limit: 0,
      };
      dispatch(fetchAllJobs(data));
    }, []);

    const [redirectJobs, setRedirectJobs] = useState(null)
    const [job,setJob] = useState('');
    const [location,setLocation] = useState('');
    const [isTitle,setTitle] = useState(false);
    const [isCompany,setCompany] = useState(false);
    const [isLoc,setLoc] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const allJobs = useSelector(state => state.jobs.allJobs);

    const handleTitleText = (e) => {
        //setTitle(true);
        setJob(e.target.value);
        let matches = [];
        if ((e.target.value).length > 0) {
          matches = allJobs.filter(job => {
            const regex = new RegExp(`^${e.target.value}`, "gi");
            if(job.jobTitle.match(regex)) {
              setTitle(true);
              return job.jobTitle.match(regex);
            } else if (job.companyName.match(regex)) {
              setCompany(true)
              return job.companyName.match(regex);
            }
            return null
          })
        }
        setSuggestions(matches);
        console.log(suggestions)
      }

    const handleLocText = (e) => {
        setLoc(true);
        setLocation(e.target.value);
        let matches = [];
        if ((e.target.value).length > 0) {
          matches = allJobs.filter(job => {
            const regex = new RegExp(`${e.target.value}`, "gi");
            return job.jobLocation.city.match(regex);
          })
        }
        setSuggestions(matches);
      }
    
    const handleTitleSelect = (item) => {
        setTitle(false);
        setJob(item);
        setSuggestions([]);
    }

    const handleCompanySelect = (item) => {
      setCompany(false);
      setJob(item);
      setSuggestions([]);
    }

    const handleLocSelect = (item) => {
        setLoc(false);
        setLocation(item);
        setSuggestions([]);
    }

    const handleJobs = () => {
      const qData = {
        "job": job,
        "location": location,
        "page": 0,
        "limit": 0
      }
      dispatch(fetchQJobs(qData))
        const data = {
            "job": job,
            "location": location
        }
        setRedirectJobs(<Redirect to={{
            pathname: '/indeed/jobs',
            state: { query: data }
        }} />)
    }
    return (
        <>
        {redirectJobs}
            <form  className={classes.searchForm} onSubmit={handleJobs}>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                    <label style={{fontSize:"24px", fontWeight:"600"}}>What</label>
                    <div className={classes.autoComplete}>
                    <input type="text" onChange={handleTitleText} value={job} onBlur={() => {
                    setTimeout(() => {
                    setSuggestions([])
                  }, 100)}} className={classes.keywordSearch} placeholder="Job Title, keywords, or company" />
                    {/* {
                    suggestions.length !== 0 && isTitle && suggestions.map((suggestion, index) =>
                    <div key={index} className={classes.suggestions} onClick={() => handleTitleSelect(suggestion.jobTitle)}>
                        {suggestion.jobTitle}
                    </div>
                    )} */}
                    {
                    suggestions.length !== 0 && isTitle && 
                    <div className={classes.suggestions}>
                        <label onClick={() => handleTitleSelect(suggestions[0].jobTitle)} style={{cursor: 'pointer'}}>{suggestions[0] && suggestions[0].jobTitle}</label><br />
                        <label onClick={() => handleTitleSelect(suggestions[1].jobTitle)} style={{cursor: 'pointer'}}>{suggestions[1] && suggestions[1].jobTitle}</label><br />
                        <label onClick={() => handleTitleSelect(suggestions[2].jobTitle)} style={{cursor: 'pointer'}}>{suggestions[2] && suggestions[2].jobTitle}</label><br />

                    </div>
                    }
                    {/* {
                    suggestions.length !== 0 && isCompany && suggestions.map((suggestion, index) =>
                    <div key={index} className={classes.suggestions} onClick={() => handleCompanySelect(suggestion.companyName)}>
                        {suggestion.companyName}
                    </div>
                    )} */}
                    {
                    suggestions.length !== 0 && isCompany && 
                    <div className={classes.suggestions}>
                        <label onClick={() => handleCompanySelect(suggestions[0].companyName)} style={{cursor: 'pointer'}}>{suggestions[0] && suggestions[0].companyName}</label><br />
                        <label onClick={() => handleCompanySelect(suggestions[1].companyName)} style={{cursor: 'pointer'}}>{suggestions[1] && suggestions[1].companyName}</label><br />
                        <label onClick={() => handleCompanySelect(suggestions[2].companyName)} style={{cursor: 'pointer'}}>{suggestions[2] && suggestions[2].companyName}</label><br />
                    </div>
                    }
                    </div>
                    </Grid>
                    <Grid item xs={4}>
                    <label style={{fontSize:"24px", fontWeight:"600"}}>Where</label>
                    <div className={classes.autoComplete}>
                    <input type="text" onChange={handleLocText} value={location} onBlur={() => {
                    setTimeout(() => {
                    setSuggestions([])
                  }, 100)}} className={classes.keywordSearch} placeholder="location" />
                    {/* {
                    suggestions.length !== 0 && suggestions.map((suggestion, index) =>
                    <div key={index} className={classes.suggestions} onClick={() => handleLocSelect(suggestion.jobLocation.city)}>
                        {isLoc && suggestion.jobLocation.city}
                    </div>
                    )} */}
                    {
                    suggestions.length !== 0 && 
                    <div className={classes.suggestions}>
                        <label onClick={() => handleLocSelect(suggestions[0].jobLocation.city)} style={{cursor: 'pointer'}}>{isLoc && suggestions[0] && suggestions[0].jobLocation.city}</label><br />
                        <label onClick={() => handleLocSelect(suggestions[1].jobLocation.city)} style={{cursor: 'pointer'}}>{isLoc && suggestions[1] && suggestions[1].jobLocation.city}</label><br />
                        <label onClick={() => handleLocSelect(suggestions[2].jobLocation.city)} style={{cursor: 'pointer'}}>{isLoc && suggestions[2] && suggestions[2].jobLocation.city}</label><br />
                    </div>
                    }
                    </div>
                    </Grid>
                    <Grid item xs={4}>
                    <Button style={{marginTop:"45px", height:"45px"}} color={'primary'} variant='contained' type='submit'>
                            Find Jobs
                    </Button>
                    </Grid>
                </Grid>
            </form>
       </>  
    );
}

export default Body;