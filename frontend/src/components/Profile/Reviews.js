import { Box, Button, Container, makeStyles, Typography, OutlinedInput, Grid } from '@material-ui/core';
import Rating from '@mui/material/Rating';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getUserReviews } from '../../Redux/Actions/JobsAction';
import { Redirect } from 'react-router-dom';

function Reviews() {
    const dispatch = useDispatch();
    const history = useHistory();
    let userId = useSelector(state=>state.login.userDetails.userId);
    let reviews = useSelector(state=>state.jobs.reviews);
    const isAuth = useSelector(state=>state.login.isAuth)

    useEffect(() => {
        const data = {
            "userId": userId
        }
        console.log(data)
        dispatch(getUserReviews(data))
    }, [])

    const handleReview = (empId) => {
        history.push(`/company/${empId}/reviews`);
    }

    return ( 
        <Container style={{display:'flex'}}>
            {!isAuth && <Redirect to='/login'/>}
            <Grid container spacing={2}>
            <Grid item xs ={12}>
                <Typography variant={'h5'} style={{fontSize:'30px',marginBottom:'20px'}}>
                    My Reviews
                </Typography>
                <hr />
                <br />
            </Grid>
            {reviews && reviews.map((review, index) => 
            <Grid item xs ={12} key={index} onClick={() => handleReview(review.employerId)}
            style={{borderBottom:"1px solid black", cursor:"pointer"}}>
                <Grid container spacing={2}>
                    <Grid item xs={2} style={{fontSize:"25px", fontWeight:"700"}}>
                        {review.overallRating}
                    </Grid>
                    <Grid item xs={4} style={{fontSize:"25px", fontWeight:"700"}}>
                    {review.reviewTitle}
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{marginTop:"10px"}}>
                    <Rating name="read-only" value={review.overallRating} readOnly />
                </Grid>
                <Grid item xs={12}>
                    {review.yourReview}
                </Grid>
            </Grid>
            )}
            <Grid item xs ={12} style={{marginTop:"30px"}}>
            </Grid>
             </Grid>
        </Container>
     );
}

export default Reviews;