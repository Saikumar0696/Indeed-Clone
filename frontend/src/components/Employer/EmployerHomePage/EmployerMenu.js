import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import RateReviewIcon from "@material-ui/icons/RateReview";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PersonIcon from "@material-ui/icons/Person";
import { IconButton, Typography } from "@material-ui/core";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { employerLogout } from "../../../Redux/Actions/EmployerSignOutAction";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    width: "400px",
    "&:focus": {
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {},
    },
  },
}))(MenuItem);

export default function EmployerMenu() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const userDetails = useSelector((state) => state.login.userDetails);
  const role = useSelector((state) => state.login.userDetails.role);
  const history = useHistory();
  const handleClick = (event) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 
  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(employerLogout());
    console.log("calling logoout");
    history.push("/employer");
  };

  return (
    <div>
      <IconButton
        edge='start'
        color='inherit'
        aria-label='open drawer'
        onClick={handleClick}>
        <PersonIcon />
      </IconButton>
      {role === 1 && (
        <StyledMenu
          id='customized-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <Typography
            variant={"h5"}
            style={{ fontSize: "20px", marginLeft: "15px" }}>
            {userDetails.email}
          </Typography>
          <Link
            to='/employer/profile'
            style={{ textDecoration: "none", color: "black" }}>
            <StyledMenuItem
              onClick={() => {
                handleClose();
              }}>
              <ListItemIcon>
                <PersonOutlineIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary='My Profile' />
            </StyledMenuItem>
          </Link>
          <StyledMenuItem>
            <ListItemIcon>
              <PowerSettingsNewIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText
              onClick={() => {
                handleLogout();
              }}
              primary='Sign Out'
            />
          </StyledMenuItem>
        </StyledMenu>
      )}
    </div>
  );
}
