import { makeStyles, Container, Grid, Box, Typography, Button, OutlinedInput } from '@material-ui/core';
import React , {useEffect, useReducer,useState} from 'react';
import  FullJobDescription  from './FullJobDescription';
import { useSelector,useDispatch } from 'react-redux';
import StarIcon from '@material-ui/icons/Star';
import { Link, useHistory } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Modal from '@material-ui/core/Modal';
import { postSavedJobs, deleteSavedJobs, applyJobs } from '../../Redux/Actions/JobsAction';
import { Redirect } from 'react-router';
import { getUserProfile } from '../../Redux/Actions/JobsAction';
import axios from 'axios';
import { API } from '../../config';

const useStyles = makeStyles(theme=>({
    container:{
        position:'sticky',
        top:'20px',
        marginLeft:'50px',
        alignSelf: 'flex-start',
        border:'1px solid black',
        padding:'20px',
        flex:'1',
        borderRadius:'10px '
    },
    link:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:'10px',
        height:'53px',
        padding:'0 25px',
        fontSize:'20px',
        color:'white',
        
        backgroundColor:theme.palette.primary.main,
        '&:hover':{
            color:theme.palette.primary.main,
            backgroundColor:'white',
            border:`1px solid ${theme.palette.primary.main}`

        }
    },
    applyJob: {
        boxSizing:'border-box',
        width: "600px",
        borderRadius:"10px", 
        height: "120vh", 
        backgroundColor: "white",
        outline:'none',
        padding:'40px',
    }
})) 
function JobDetails({jobData, index}) {
    console.log("index : ", index)
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const isAuth = useSelector(state=>state.login.isAuth)
    const {userId, email} = useSelector(state=>state.login.userDetails)
    const [viewUndo, setViewUndo] = useState([])
    const [display, setDisplay] = useState(false)
    const [open, setOpen] = useState(false);
    const [flag, setFlag] = useState(false)
    const [resumeFile, setResumeFile] = useState(null)
    let profile = useSelector(state=>state.jobs.profile);
    const isApplied = useSelector(state=>state.jobs.isApplied);
    const jobResponse = useSelector(state=>state.jobs.jobResponse);
    
    const handleOpen = () => {
        if (!isAuth) {
            history.push('/login');
        } else {
            setOpen(true)
        }
    };
    const handleClose = () => setOpen(false);

    useEffect(async () => {
        const data = {
            "userId": userId
        }
       await dispatch(getUserProfile(data))
    }, [display, flag])

    const displayUndo = (jobId) => {
        if (!isAuth) {
            history.push('/login');
        } else {
            const data = {
                "jobId": jobId,
                "userId": userId
            }
            let temp = viewUndo
            temp[index] = !temp[index]
            setViewUndo(temp)
            setDisplay(!display)
            dispatch(postSavedJobs(data))
            console.log("---", viewUndo)
        }
    }

    const hideUndo = (jobId) => {
        console.log("delete")
        const data = {
            "jobId": jobId,
            "userId": userId
        }
        let temp = viewUndo
        temp[index] = !temp[index]
        setViewUndo(temp)
        setDisplay(!display)
        dispatch(deleteSavedJobs(data))
    }

    const handleChange = (e) => {
        setResumeFile(e.target.files[0])
    }

    const handleResume = (e) => {
        e.preventDefault()
        console.log(resumeFile)
        const data = {
            "userId": userId
        }
        const formData = new FormData();
        formData.append('resume', resumeFile)
        formData.append('userId', userId)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        } 
        axios.post(`${API}/upload/updateResume`, formData, config).then((response) => {
            setFlag(!flag)
            console.log(response)
          }).catch((error) => {
              console.log(error);
          })
    }

    const handleApplyJob = (jobId, employerId) => {
        if (isAuth) {
            const data = {
                "userId": userId,
                "jobId": jobId,
                "employerId": employerId,
                "resume": profile.resume,
                "email": profile.email
            }
            dispatch(applyJobs(data))
            setOpen(false)
        } else {
            history.push('/login');
        }
    }

    const handleCompany = (empId) => {
        history.push(`/company/${empId}/snapshot`);
    }

    const handleReviews = (empId) => {
        history.push(`/company/${empId}/reviews`);
    }

    return (
        <Box className={classes.container}>
            <Typography variant={'h5'} style={{marginBottom:'10px'}}>
                {jobData.jobTitle}
            </Typography>
            <Box style={{marginBottom:'10px'}}>
            <div style={{fontSize:"14px", fontWeight:"700"}}>
            <label style={{cursor:"pointer"}} 
            onClick={() => handleCompany(jobData.employerID._id)}>
                {jobData.companyName}</label>{'  '}
                {jobData.employerID && jobData.employerID.averageRating && 
                <label>{jobData.employerID.averageRating}</label>}
                <StarIcon fontSize="small" style={{height:"12px"}} />
                {'  '}<label onClick={() => handleReviews(jobData.employerID._id)}
                 style={{color:"#3A74F2", cursor:"pointer"}}>
                     {jobData.employerID && jobData.employerID.noOfRatings &&
                      <label>{jobData.employerID.noOfRatings+ ' reviews'}</label>}</label>
            </div>
            <div style={{fontWeight:"700"}}>
            {jobData.jobLocation.address}{' '}
            {jobData.jobLocation.city}{' '}{jobData.jobLocation.state}{' '}
            {jobData.jobLocation.country}{' '}{jobData.jobLocation.zipcode}
            </div>
            </Box>
            <Box style={{marginBottom:'10px'}} style={{fontSize:"15px", fontWeight:"700"}}>
            {'Salary $'}{jobData.salary}{' - '}{jobData.isRemote ? 'Remote' : 'On-line'}
            </Box>
            <Grid container>
                <Grid item xs={4}>
                <Button className={classes.link} onClick={handleOpen} style={{marginTop:'10px', marginBottom:'30px'}}>
                    Apply Now
                </Button>
                {isApplied && <p style={{color: "red", fontWeight: "700"}}>Job Already Applied</p>}
                {jobResponse && <p style={{color: "blue", fontWeight: "700"}}>Job Applied Successfully</p>}
                <Modal style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                    }}
                    open={open}
                    onClose={handleClose}>
                    <Box className={classes.applyJob}>
                    <Typography variant="h4" component="h2">
                        Apply for Job
                    </Typography>
                    <hr />
                    <Grid item>
                            <Typography style={{ fontWeight:"600", marginTop:"10px"}}>
                                Name
                            </Typography>
                            <OutlinedInput type="text" style={{width:"300px", height:"40px"}} placeholder="Enter name"/>
                            <Typography style={{fontWeight:"600", marginTop:"10px"}}>
                                Email
                            </Typography>
                            <OutlinedInput type="email" value={email} style={{width:"300px", height:"40px"}} placeholder="Enter email"/>
                            <Typography style={{fontWeight:"600", marginTop:"10px"}}>
                                Contact
                            </Typography>
                            <OutlinedInput type="text" style={{width:"300px", height:"40px"}} placeholder="Enter contact"/>
                            <Typography style={{fontWeight:"600", marginTop:"10px"}}>
                                Location
                            </Typography>
                            <OutlinedInput type="text" style={{width:"300px", height:"40px"}} placeholder="Enter location"/>
                            <Typography style={{fontWeight:"600", marginTop:"10px"}}>
                                Resume
                            </Typography>
                            <br  />
                            <form onSubmit={handleResume}>
                                <input type="file" name="resume" onChange={handleChange} />
                                <br />
                                <br />
                                        {profile && profile.resume && 
                                       <Link to={"/"+profile.resume.split("\\")[3]} target="_blank" download 
                                       style={{marginTop:"10px", textDecoration:"none"}}>
                                       Download your resume here <br />
                                       {profile.resume.split("\\")[3]+ ' '}
                                       <i className="fa fa-download"></i>
                                       </Link>
                                        }
                                <br />
                                <br />
                                <input type='submit' value='Upload!' style={{width:"100px", backgroundColor:"#2D5DCE"}} />
                            </form>
                            <br />
                            <Button onClick={() => handleApplyJob(jobData._id,jobData.employerID._id)}
                             style={{ color:"black", backgroundColor:"#2D5DCE", width:"100px"}} 
                            variant="contained">Submit</Button>
                    </Grid>
                    </Box>
                </Modal>
                </Grid>
                <Grid item xs={4}>
                <Button className={classes.link} onClick={() => displayUndo(jobData._id, index)} style={{marginTop:'10px', marginBottom:'30px', backgroundColor:'#A4A7AD'}}>
                    <FavoriteBorderIcon />
                </Button>
                </Grid>
            </Grid>
                {viewUndo[index] && 
                <Grid container spacing={4} style={{backgroundColor:'#CFD2D7', borderRadius:'10px'}}>
                    <Grid item xs={4}>
                        <Link to='/indeed/saved-jobs'>Moved to saved</Link>
                    </Grid>
                    <Grid item xs={4}>
                        <div onClick={() => hideUndo(jobData._id)}>Undo</div>
                    </Grid>
                </Grid>
                }
            <hr />
            <FullJobDescription jobData={jobData} />
        </Box>
    );
}

export default JobDetails;