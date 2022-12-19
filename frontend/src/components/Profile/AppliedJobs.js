import { Box, Button, Container, makeStyles, Typography, OutlinedInput, Grid } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import React, { useReducer, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSavedJobs, applyJobs, getAppliedJobs } from '../../Redux/Actions/JobsAction';
import { Redirect } from 'react-router-dom';
import { Link, useHistory } from 'react-router-dom';

function AppliedJobs() {
    const dispatch = useDispatch();
    let { userDetails } = useSelector((state) => state.login);
    let sJobs  = useSelector((state) => state.jobs.savedJobs);
    let aJobs  = useSelector((state) => state.jobs.appliedJobs);
    const isAuth = useSelector(state=>state.login.isAuth)
    const history = useHistory()

    let savedJobs = null
    if (sJobs) {
        savedJobs = sJobs.savedJobs
    }
    let appliedJobs = null
    if (aJobs) {
        appliedJobs = aJobs.appliedJobs
    }
    const { userId } = userDetails;
    useEffect(() => {
        const data = {
            "userId": userId
        }
        dispatch(getSavedJobs(data))
        dispatch(getAppliedJobs(data))
    }, [])

    const handleCompany = (empId) => {
        history.push(`/company/${empId}/snapshot`);
    }

    return (
        <Container style={{display:'flex'}}>
            {!isAuth && <Redirect to='/login'/>}
            <Box>
                <Typography variant={'h5'} style={{fontSize:'30px',marginBottom:'20px'}}>
                    My Jobs
                </Typography>
                <ul style={{display:'flex',marginBottom:'20px'}}>
                    <NavLink to="/indeed/saved-jobs" activeStyle={{
                        color:"#0145E3",
                        textDecoration:'underline'}} style={{fontSize:'20px',marginRight:"30px"}}>
                        Saved {savedJobs && savedJobs.length}
                    </NavLink>
                    <NavLink to="/indeed/applied-jobs" style={{fontSize:'20px'}}>
                        Applied {appliedJobs && appliedJobs.length}
                    </NavLink>
                </ul>
                <hr />
                <Box>
                    {appliedJobs && appliedJobs.map((job,key) => {
                        return(
                    <Box style={{display:'flex', borderBottom:'1px solid black', marginTop:'10px'}} key={key}>
                        <Box style={{width:'500px'}}>
                            <Typography variant='h5' style={{fontSize:'18px',marginBottom:'15px'}}> 
                                {job.jobTitle}
                            </Typography>
                            <Box style={{marginBottom:'15px'}}>
                            <label style={{cursor:"pointer"}} onClick={() => handleCompany(job.employerID._id)}>{job.companyName}</label>{'  '}<br />
                                    {job.jobLocation.city}
                                    {', '}{job.jobLocation.state}
                            </Box>
                        </Box>
                        <Box style={{display:'flex'}}>
                            <Button style={{color:'#0145E3',
                                            width:"200px",
                                            height:'40px',
                                            border:'2px solid #909090',
                                            borderRadius:'10px'}}>
                                Applied
                            </Button>
                        </Box>
                        <Box style={{cursor:"pointer",width:"40px",height:'40px',display:'flex',justifyContent:'center',alignItems:'center'}} >
                            <span style={{fontSize:"20px"}}></span>
                        </Box>
                        <hr />
                    </Box>
                )}
                )
                }
                </Box>
                </Box>
        </Container>
    );
}

export default AppliedJobs;
