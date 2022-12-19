import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Box, Button, Typography, makeStyles, OutlinedInput, Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Body from './Body';
import axios from 'axios';
import { API } from '../../config';
import { getUserProfile } from '../../Redux/Actions/JobsAction';
import { Link } from 'react-router-dom';

const styles = {
  container: {
    padding: "0px 10vw",
    marginTop: "80px",
  },
  linkContainer: {
    marginLeft: "150px",
    marginTop: "30px",
  },
  link: {
    fontWeight: "bolder",
    color: "#0039C0",
    cursor: "pointer",
  },
};

const useStyles = makeStyles((theme) => ({
  applyJob: {
    boxSizing: "border-box",
    width: "600px",
    borderRadius: "10px",
    height: "100vh",
    backgroundColor: "white",
    outline: "none",
    padding: "40px",
  },
}));
const Home = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    let userId = useSelector(state=>state.login.userDetails.userId);
    let profile = useSelector(state=>state.jobs.profile);
    const isAuth = useSelector(state=>state.login.isAuth)

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        if (!isAuth) {
            history.push('/login')  ;
        } else {
            setOpen(true)
        }
    };
    const handleClose = () => setOpen(false);
    const [resumeFile, setResumeFile] = useState(null)
    const [flag, setFlag] = useState(false)

  useEffect(async () => {
    const data = {
      userId: userId,
    };
    await dispatch(getUserProfile(data));
  }, [flag]);

  const handleChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

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

    return (
        <Container style={styles.container}>
            <Body />
            <div style={styles.linkContainer}>
                <label style={styles.link} onClick={handleOpen} >
                    {`Post your resume - `} 
                </label>
                It only takes a few seconds
            </div>
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
                        Resume upload
                    </Typography>
                    <hr />
                    <Grid item>
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
                    </Grid>
                    </Box>
                </Modal>
        </Container>
    );
}

export default Home;
