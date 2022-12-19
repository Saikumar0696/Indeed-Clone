import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from "react-redux";
import { fetchAllJobs, fetchQueriedJobs } from '../../Redux/Actions/JobsAction';
import { useHistory } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';
import JobDetails from './JobDetails';
import Pagination from '@mui/material/Pagination';

const useStyles = makeStyles(theme=>({
    job_section:{
        padding:'0 8vw',
        position:'relative'
    },
    jobContainer:{
        width:'450px'
    },
    card:{
        border:'1px solid black',
        padding:'15px',
        cursor:'pointer',
        position:'relative',
        height:'300px',
        marginBottom:'20px',
        '&:hover':{
            '& $job_title':{
                textDecoration:'underline'
            }
        },
        borderRadius:'10px'
    },
    job_title:{
        fontWeight:'bold',
        fontSize:'20px'
    },
    job_subTitle:{
        fontSize:'16px'
    },
    job_snippet:{
        margin:'10px 0px 10px 0px',
        fontSize:'15px',
        lineHeight:'1.4rem'
    },
}))

function JobsDisplay(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory();
    const jobDetails = useSelector(state=>state.jobs.queriedJobs)
    const allJobDetails = useSelector(state=>state.jobs.allJobs)
    const jobDetailsLength = useSelector(state=>state.jobs.queriedJobsLength)
    const [jobData,setJobData] = useState(null)
    const [index,setIndex] = useState(null)
    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(3)
    useEffect(() => {
        const data = {
            "job": props.location.state.query.job,
            "location": props.location.state.query.location,
            "page": page,
            "limit": limit
        }
        dispatch(fetchQueriedJobs(data))
    },[page, limit])
    let boundary = 0;
    if (jobDetailsLength) {
        boundary = Math.ceil(jobDetailsLength/limit)
    }
    const getJobDetails = (job, index) => {
        setIndex(index)
        setJobData(job)
    }

    const handlePage = (e, value) => {
        setPage(value) 
    }
    
    const handleLimit = (e) => {
        setLimit(e.target.value)
    }

    const handleCompany = (empId) => {
        history.push(`/company/${empId}/snapshot`);
    }

    return ( 
        <Container className={classes.job_section}>
            <Box style={{display:'flex'}}>
                {
                    jobDetails && 
                    <Grid className={classes.jobContainer} container>  {
                        jobDetails.map((job,index)=>
                        <Grid className={classes.card}  item key={index} lg={12} md={12} sm={12} xs={12} >
                            <Box onClick={() => getJobDetails(job, index)}>
                                <Typography  className={classes.job_title}>
                                    {job.jobTitle}
                                </Typography>
                                <Typography className={classes.job_subTitle}>
                                   {job.employerID && <label style={{cursor:"pointer"}} 
                                   onClick={() => handleCompany(job.employerID._id)}>{job.companyName}</label>} {' '} 
                                    <label style={{fontSize:"14px", fontWeight:"700"}}>
                                        {job.employerID && job.employerID.averageRating && 
                                        <label>{job.employerID.averageRating}</label>} 
                                        <StarIcon fontSize="small" style={{height:"12px"}} />
                                        </label>
                                </Typography>
                                <Typography className={classes.job_subTitle}>
                                    {job.jobLocation.address}{' '}
                                    {job.jobLocation.city}{' '}{job.jobLocation.state}{' '}
                                    {job.jobLocation.country}{' '}{job.jobLocation.zipcode}
                                </Typography>
                                <br />
                                <Typography className={classes.job_subTitle} style={{fontSize:"15px", fontWeight:"500", fontStyle:"italic"}}>
                                    {'Salary $'}{job.salary}
                                </Typography>
                                <div className={classes.job_snippet} >
                                    <ul style={{marginLeft:"10px"}}>
                                    <li style={{listStyleType:"circle"}}>{job.jobDescription.moreInfo.split(".")[0]}{'.'}</li>
                                    <li style={{listStyleType:"circle"}}>{job.jobDescription.moreInfo.split(".")[1]}{'.'}</li>
                                    </ul>
                                </div>
                            </Box>
                        </Grid>)
                    }
                </Grid>
                }
                {
                    jobData ? <JobDetails jobData={jobData} index={index}/> : <></>
                }
                </Box>
                <Grid container>
                    <Grid item xs={3}>
                        <label>Rows per page</label>&nbsp;&nbsp;
                    <select onChange={handleLimit}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                    </select>
                    </Grid>
                    <Grid item xs={9}>
                        <Pagination count={boundary} page={page} onChange={handlePage} />
                    </Grid>
                </Grid>
                <Box style={{marginTop:"30px"}}>
                </Box>
        </Container>
    );
}

export default JobsDisplay;