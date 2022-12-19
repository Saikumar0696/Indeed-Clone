import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector } from "react-redux";
import {getUserProfile, updateJobApplicationStatus} from "../../../Redux/Actions/JobsAction";
import {Link, Redirect} from "react-router-dom";
import {Box, Button, Container, Grid, makeStyles, OutlinedInput, Typography} from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';


const ApplicantProfilePage = ({match, history}) => {

    const dispatch = useDispatch();

    const { userId, jobId, employerId } = match.params

    const [applicationStatus, setApplicationStatus] = React.useState('Applied');

    const updateJobApplication = useSelector(state => state.updateJobApplication)
    const { application,success } = updateJobApplication

    const handleChange = (event) => {
        setApplicationStatus(event.target.value);
        //console.log(event.target.value);
        dispatch(updateJobApplicationStatus(userId, jobId, employerId, event.target.value))
    };

    const profile = useSelector(state=>state.jobs.profile);

    useEffect(() => {
        const data = {
            "userId": userId
        }
        dispatch(getUserProfile(data))
        if(success){
            
            history.push(`/employer/applicant-page/${jobId}&${employerId}`)
        }
    }, [match, history,success])

    return(
        <Container>
            <Box style={{marginLeft:"450px"}}>
                <Grid>
                    <Grid item>
                        <Typography variant = "h5">Applicant Profile</Typography>
                    </Grid>
                    { profile &&
                    <Grid item>
                        {profile.email && <Typography> {profile.email} </Typography>}
                        <Typography>
                            Resume
                        </Typography>
                        <Typography>
                            {profile && profile.resume &&
                                <Link to={"/"+profile.resume.split("\\")[3]} target="_blank" download style={{marginTop:"10px"}}>
                                    Download your resume here {' '}
                                    <i className="fa fa-download" />
                                </Link>
                            }
                        </Typography>
                        <br />
                        <FormControl>
                            <Select value={applicationStatus} onChange={handleChange}>
                                <MenuItem value=""><em>Applied</em></MenuItem>
                                <MenuItem value="Reviewed">Reviewed</MenuItem>
                                <MenuItem value="InitialScreening">Initial Screening</MenuItem>
                                <MenuItem value="Interviewing">Interviewing</MenuItem>
                                <MenuItem value="Selected">Selected</MenuItem>
                                <MenuItem value="Rejected">Choose not to move Forword</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>}
                </Grid>
            </Box>
        </Container>
    )
}

export default ApplicantProfilePage;