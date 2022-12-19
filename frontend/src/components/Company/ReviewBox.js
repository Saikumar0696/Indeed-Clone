import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StarIcon from '@material-ui/icons/Star';
import { Grid, Typography } from '@material-ui/core';
import { Rating } from "@mui/material";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import {updateReviewStatus} from "../../Redux/Actions/Company";


export function ReviewBox({id, rating, review_title, date, yourReview, pros, cons ,helpfulCount,isApproved,isAuth, userRole}) {
    const dispatch = useDispatch();
    const [isApprovedByAdmin, setisApprovedByAdmin] = useState(isApproved);
    
    const changeToApproved = () => {
        debugger;
        setisApprovedByAdmin("Approved");
        dispatch(updateReviewStatus({reviewid: id}));
    }
    useEffect(() => {
        
    }, [isApprovedByAdmin])
    return (
            <Grid item container spacing={4} style={{borderBottom: '#00000029 solid 1px'}}>
            <Grid item container spacing={1}>
                <Grid item style={{width:"57px"}}>
                    <h4 style={{borderBottom: "3px dotted #000"}}>{rating}.0</h4>
                     
                <Rating
                  name="size-small"
                  style={{ color: "#9d2b6b"}}
                  value={rating}
                  size="small"
                  precision={0.5}
                  readOnly
                />  
              
                            
                 </Grid>
                <Grid item>
                    <Typography variant = "head2" style = {{fontWeight: "800"}}>{review_title}</Typography>{'  '}
                    
                    {/* {isApprovedByAdmin === "NotApproved" ? (<button type="button" disabled='true' class="btn btn-danger" 
                    style={{height: '26px', fontWeight: '200',fontSize: "small" , padding: '4px'}}
                    >
                        <i class="fa fa-times" aria-hidden="true" style={{color: "white"}}></i>{ ' '}
                       Not Verified</button>) 
                    : 
                    (<button type="button" class="btn btn-success" disabled='true' 
                    style={{height: '26px', fontWeight: '200',fontSize: "small" , padding: '4px'}}>
                         <i class="fas fa-check" style={{color: "white"}}></i> { ' '} verified</button>) } */}
                </Grid>
            </Grid>
            <Grid item container spacing={3}>
                <Typography variant="subtitle1" style ={{marginLeft:"20px"}}>
                    {yourReview}
                </Typography>
            </Grid>
            <Grid item container spacing={3}>
            <span><i class="fas fa-check" style={{color: "green"}}></i></span>
            <div spacing={3}><b> Pros </b></div><br></br>
            </Grid>
            <Grid item container spacing={3}>
            <Typography variant="subtitle1" style ={{marginLeft:"20px"}}>
                    {pros}
                </Typography>
            </Grid>
            <Grid item container spacing={3}>
            <i class="fa fa-times" aria-hidden="true" style={{color: "red"}}></i><br></br>
            <div spacing={3}><b>Cons </b> </div>
            </Grid>
         
            <Grid item container spacing={3}>
            <Typography variant="subtitle1" style ={{marginLeft:"20px"}}>
                    {cons}
                </Typography>
            </Grid>

        </Grid>
    )
  
}