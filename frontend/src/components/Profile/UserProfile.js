import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, makeStyles, Typography, Button, OutlinedInput } from '@material-ui/core';
import Header from '../Header/Header';
import axios from 'axios';
import { API } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../../Redux/Actions/JobsAction';
import { validateProfile } from "./ValidateProfile";
import { Link, Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    errorDisplay: {
        color: "red",
        fontWeight: "700",
    }
}))

function UserProfile() {
    const classes = useStyles();
    let userId = useSelector(state=>state.login.userDetails.userId);
    let profile = useSelector(state=>state.jobs.profile);
    const isAuth = useSelector(state=>state.login.isAuth)

    const [resumeFile, setResumeFile] = useState(null)
    const [flag, setFlag] = useState(false)
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [contact, setContact] = useState(null)
    const [location, setLocation] = useState(null)
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    useEffect(async () => {
        const data = {
            "userId": userId
        }
       await dispatch(getUserProfile(data))
    }, [flag])

    const handleChange = (e) => {
        setResumeFile(e.target.files[0])
    }

    const handleResume = (e) => {
        e.preventDefault()
        console.log(resumeFile)
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

    const handleDelete = () => {
        const data = {
            "userID": userId
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        axios.get(`${API}/upload/deleteResume`, {
            params: data
        }, config)
        .then((response) => {
            setFlag(!flag)
            console.log(response)
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: name,  
            email: email,
            contact: contact,
            location: location
        };
    
        const error = await validateProfile(data);
        if (Object.keys(error).length !== 0) {
          setErrors(error);
        } else {
          setErrors({});
          const updatedData = {
            "userId": userId,
            "firstName": name,  
            "email": email,
            "contact": contact,
            "location": location
          }
          await dispatch(updateUserProfile(updatedData));
        }
      };

    return (
        <Container>
            {!isAuth && <Redirect to='/login' />}
            <Box style={{marginLeft:"450px"}}>
                <Grid>
                    <Grid item>
                        <Typography variant = "h5">My Profile</Typography>
                    </Grid>
                    <Grid item>
                            <Typography style={{ fontWeight:"600", marginTop:"10px"}}>
                                Name
                            </Typography>
                            <OutlinedInput type="text" onChange={(e) => setName(e.target.value)} style={{width:"300px", height:"40px"}} placeholder="Enter name"/>
                            {errors.name && (
                                <p className={classes.errorDisplay}>{errors.name}</p>
                            )}
                            <Typography style={{fontWeight:"600", marginTop:"10px"}}>
                                Email
                            </Typography>
                            <OutlinedInput type="email" onChange={(e) => setEmail(e.target.value)} style={{width:"300px", height:"40px"}} placeholder="Enter email"/>
                            {errors.email && (
                                <p className={classes.errorDisplay}>{errors.email}</p>
                            )}
                            <Typography style={{fontWeight:"600", marginTop:"10px"}}>
                                Contact
                            </Typography>
                            <OutlinedInput type="text" onChange={(e) => setContact(e.target.value)} style={{width:"300px", height:"40px"}} placeholder="Enter contact"/>
                            {errors.contact && (
                                <p className={classes.errorDisplay}>{errors.contact}</p>
                            )}
                            <Typography style={{fontWeight:"600", marginTop:"10px"}}>
                                Location
                            </Typography>
                            <OutlinedInput type="text" onChange={(e) => setLocation(e.target.value)} style={{width:"300px", height:"40px"}} placeholder="Enter location"/>
                            {errors.location && (
                                <p className={classes.errorDisplay}>{errors.location}</p>
                            )}
                            <Typography style={{fontWeight:"600", marginTop:"10px"}}>
                                Resume
                            </Typography>
                            <br  />
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <form onSubmit={handleResume}>
                                        <input type="file" name="resume" onChange={handleChange} /> 
                                        <br />
                                        <br />
                                        {profile && profile.resume && 
                                        <Link to={"/"+profile.resume.split("\\")[3]} target="_blank" download style={{marginTop:"10px"}}>
                                        Download your resume here {' '}
                                        <i className="fa fa-download"></i>
                                        </Link>
                                        }
                                        <br />
                                        <br />
                                        <input type='submit' value='Upload Resume' 
                                        style={{width:"150px", height:"35px", backgroundColor:"#94B8EF"}} />
                                    </form>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button color='primary' onClick={handleDelete} style={{border:"1px solid black",
                                    color:"black", backgroundColor:"#94B8EF", marginTop:"125px", marginLeft:"40px"}}>Delete Resume</Button>
                                </Grid>
                            </Grid>
                            <br />
                            <Button style={{ color:"black", backgroundColor:"#2D5DCE", width:"100px"}} variant="contained" onClick={handleSubmit}>Submit</Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
     );
}

export default UserProfile;
