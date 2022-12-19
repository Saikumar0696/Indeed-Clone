import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";

import {
  getcompaniesDetails,
  getCompanySpecificReviews,
} from "../../../Redux/Actions/Company";
import axios from "axios";
import StarIcon from "@material-ui/icons/Star";
import { Rating } from "@mui/material";
import { ReviewBox } from "../../Company/ReviewBox";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { Form, Col, Card, Row, Alert } from "react-bootstrap";

import CameraAltIcon from "@material-ui/icons/CameraAltRounded";
import Modal from "@material-ui/core/Modal";
import { TextField } from "@material-ui/core";
import { API } from "../../../config";
import { employerDetailsGet } from "../../../Redux/Actions/EmployerDetailsAction";
import {
  Grid,
  Container,
  makeStyles,
  Typography,
  Button,
  withStyles,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import EmployerCompanyDetailsUpdate from "../EmployerDetails/EmployerCompanyDetailsUpdate";

const useStyle = makeStyles((theme) => ({
  formhelperText: {
    color: "#085ff7",
    paddingLeft: "20px",
    cursor: "pointer",
    fontSize: "17px",
  },
  outlinedInput: {
    width: "700px",
  },
  formStyle: {
    width: "100%",
  },

  imgCont: {
    padding: "5px",
    borderRadius: "5px",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  optionTab: {
    cursor: "pointer",
    margin: "0 40px 0 40px",
  },
  activeTab: {
    cursor: "pointer",
    margin: "0 40px 0 40px",
    fontWeight: "bold",
    borderBottom: "5px solid #000000",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "relative",
    height: 700,
    width: 768,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  photopaper: {
    position: "relative",
    height: 300,
    width: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    padding: "22px",
    marginLeft: "50px",
  },
}));

const UplaodButton = withStyles((theme) => ({
  root: {
    color: "#ffffff",
    backgroundColor: "#085ff7",
    cursor: "pointer",
    width: "200px",
    borderRadius: "200px",
    height: "53px",
    marginLeft: "50px",
    "&:hover": {
      backgroundColor: "#0542ac",
    },
  },
}))(Button);

export default function EmployerHomePage(props) {
  const classes = useStyle();
  const [tooltipopen, setTooltipopen] = React.useState(true);
  const loginReducer = useSelector((state) => state.login);
  const { isAuth, userDetails } = loginReducer;
  const [images, setImage] = useState({});
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const [modalStyle] = React.useState(getModalStyle);

  const [photoOpen, setPhotoOpen] = useState(false);
  const [photoType, setPhotoType] = useState("");

  const handleBannerPhotoOpen = () => {
    isAuth ? setPhotoOpen(true) : props.history.push("/login");
    console.log("photoOpen ", photoOpen);
    setPhotoType("companyBanner");
  };
  const handleLogoPhotoOpen = () => {
    isAuth ? setPhotoOpen(true) : props.history.push("/login");
    console.log("photoOpen ", photoOpen);
    setPhotoType("companyLogo");
  };
  const handleCeoPhotoOpen = () => {
    isAuth ? setPhotoOpen(true) : props.history.push("/login");
    console.log("photoOpen ", photoOpen);
    setPhotoType("companyCeoPicture");
  };
  const handlePhotoClose = () => {
    setPhotoOpen(false);
    setPhotoType("");
  };
  useEffect(() => {
    console.log("Photo Open ", photoOpen);
  }, [photoOpen]);
  const filehandler = async (event) => {
    event.preventDefault();
    let urls = [];
    let file = images[0];
    const formData = new FormData();
    console.log(file);
    formData.append("file", file);
    formData.append("upload_preset", "indeed");
    axios
      .post("https://api.cloudinary.com/v1_1/dgqlka0rq/image/upload", formData)
      .then((res) => {
        console.log(res.data.secure_url);
        urls.push(res.data.secure_url);
        axios
          .post(`${API}/employer/employer_pic_upload`, {
            urls,
            employerID: userDetails.userId,
            fieldName: photoType,
          })
          .then((res) => {
            setPhotoOpen(false);
            console.log(res);
            // dispatch(getcompaniesDetails({ employerID: res.data._id }));
          });
      });
  };

  const showPhotos = () => (
    <div className='row'>
      <div className='col-md-9'>
        <Grid item style={{ marginTop: "20px", marginBottom: "50px" }}>
          <CameraAltIcon></CameraAltIcon>
          <b>Company Logo</b>
        </Grid>
      </div>
      <UplaodButton
        type='submit'
        name='companyBanner'
        variant='contained'
        onClick={handleLogoPhotoOpen}>
        Upload Logo
      </UplaodButton>
      <div className='col-md-9'>
        <Grid item style={{ marginTop: "20px", marginBottom: "50px" }}>
          <CameraAltIcon></CameraAltIcon>
          <b>Company Banner</b>
        </Grid>
      </div>
      <UplaodButton
        type='submit'
        name='companyLogo'
        variant='contained'
        onClick={handleBannerPhotoOpen}>
        Upload Banner
      </UplaodButton>
      <div className='col-md-9'>
        <Grid item style={{ marginTop: "20px", marginBottom: "50px" }}>
          <CameraAltIcon></CameraAltIcon>
          <b>CEO</b>
        </Grid>
      </div>
      <UplaodButton
        type='submit'
        name='companyCeoPicture'
        variant='contained'
        onClick={handleCeoPhotoOpen}>
        Upload photo
      </UplaodButton>
    </div>
  );

  const changePathName = (pathName) => {
    props.history.push(`/employer/home/${userDetails.userId}/${pathName}`);
  };
  const { responseFromServer } = useSelector((state) => state.employerDetails);

  useEffect(() => {
    if (userDetails && userDetails.userId) {
      dispatch(employerDetailsGet(userDetails.userId));
    }
  }, [props]);

  useEffect(() => {
    if (userDetails && userDetails.userId) {
      dispatch(employerDetailsGet(userDetails.userId));
    }
  }, [photoOpen]);

  const companyDetails = responseFromServer
    ? responseFromServer
    : { aboutTheCompany: {} };

  const showCompany = () => (
    <div>
      <Grid item style={{ marginTop: "20px", marginBottom: "30px" }}>
        <Typography variant='caption'>
          {companyDetails.employerName} Careers and Employment
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant='h5'>
          <b>Work happiness</b>
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: "20px", marginBottom: "30px" }}>
        <Typography variant='caption'>
          Scores based on about 3 responses to Indeed's survey on work happiness
        </Typography>
      </Grid>
      <Grid container item style={{ flex: 3, flexDirection: "row" }}>
        <Grid
          item
          xl={4}
          lg={4}
          style={{
            padding: "20px",
          }}>
          <Typography variant=''>
            <HtmlTooltip
              open={tooltipopen}
              title='Do people feel happy at work most of the time?'
              arrow>
              <span>
                <b>{companyDetails.averageWorkHappinessScore}</b>
              </span>
            </HtmlTooltip>
          </Typography>{" "}
          <b>Work Happiness Score</b>
        </Grid>
        <Grid
          item
          xl={4}
          lg={4}
          style={{
            padding: "20px",
          }}>
          <Typography variant=''>
            <HtmlTooltip
              open={tooltipopen}
              title='Do people feel they are achieving most of their goals at work?'
              arrow>
              <b>{companyDetails.averageAppreciationScore}</b>
            </HtmlTooltip>
          </Typography>{" "}
          <b>Achievement Score</b>
        </Grid>
        <Grid
          item
          xl={4}
          lg={4}
          style={{
            padding: "20px",
          }}>
          <Typography variant=''>
            <HtmlTooltip
              open={tooltipopen}
              title='Do people feel they often learn something at work?'
              arrow>
              <b>{companyDetails.averageLearningScore}</b>
            </HtmlTooltip>
          </Typography>{" "}
          <b>Learning</b>
        </Grid>
      </Grid>
      <Grid item style={{ marginTop: "100px", marginBottom: "50px" }}>
        <Typography variant='h5'>
          <b>About the company</b>
        </Typography>
      </Grid>
      <Grid container spacing={1}>
        <Grid item style={{ flex: 1 }}>
          <img
            src={companyDetails.companyCeoPicture}
            alt={companyDetails.employerName}
            style={{ height: "350px", borderRadius: "10px" }}
          />
        </Grid>
        <Grid container item style={{ flex: 6, flexDirection: "row" }}>
          <Grid
            item
            xl={5}
            lg={5}
            style={{
              border: "2px solid #f2f2f2",
              borderRadius: "10px",
              padding: "20px",
            }}>
            <div style={{ fontWeight: "600" }}>CEO</div>
            <br />
            <br />
            <div>{companyDetails.aboutTheCompany.ceo}</div>
          </Grid>
          <Grid
            item
            xl={5}
            lg={5}
            style={{
              border: "2px solid #f2f2f2",
              borderRadius: "10px",
              padding: "20px",
            }}>
            <div style={{ fontWeight: "600" }}>Revenue</div>
            <br />
            <br />
            <div>{companyDetails.aboutTheCompany.revenue}</div>
          </Grid>
          <Grid
            item
            xl={5}
            lg={5}
            style={{
              border: "2px solid #f2f2f2",
              borderRadius: "10px",
              padding: "20px",
            }}>
            <div style={{ fontWeight: "600" }}>Company size</div>
            <br />
            <br />
            <div style={{}}>{companyDetails.aboutTheCompany.companySize}</div>
          </Grid>
          <Grid
            item
            xl={5}
            lg={5}
            style={{
              border: "2px solid #f2f2f2",
              borderRadius: "10px",
              padding: "20px",
            }}>
            <div style={{ fontWeight: "600" }}>Industry</div>
            <br />
            <br />
            <div style={{}}>{companyDetails.aboutTheCompany.industry}</div>
          </Grid>
        </Grid>
        <Grid container item style={{ flex: 6, flexDirection: "column" }}>
          <Grid
            item
            xl={5}
            lg={5}
            style={{
              border: "2px solid #f2f2f2",
              borderRadius: "10px",
              padding: "20px",
            }}>
            <div style={{ fontWeight: "600" }}>Founded</div>
            <br />
            <br />
            <div style={{}}>{companyDetails.aboutTheCompany.founded}</div>
          </Grid>
        </Grid>
      </Grid>
      <Grid container style={{ padding: "40px" }}>
        <Typography
          variant='body2'
          style={{ color: "#767676", textAlign: "left" }}>
          {companyDetails.aboutTheCompany.description}
          <Typography
            variant='body2'
            style={{ color: "#767676", textAlign: "left" }}>
            {companyDetails.aboutTheCompany.misssionandvisson}
          </Typography>
        </Typography>
      </Grid>
    </div>
  );
  const showFooter = () => (
    <div>
      <Grid
        container
        spacing={1}
        style={{
          fontSize: "14px",
          backgroundColor: "white",
          padding: "15px 10px",
          margin: "50px -20px 0",
        }}>
        <Grid item style={{ cursor: "pointer" }}>
          ©️ 2020 Indeed
        </Grid>
        <Grid item>-</Grid>
        <Grid item style={{ cursor: "pointer" }}>
          Accessibility at Indeed
        </Grid>
        <Grid item>-</Grid>
        <Grid item style={{ cursor: "pointer" }}>
          Privacy Center
        </Grid>
        <Grid item>-</Grid>
        <Grid item style={{ cursor: "pointer" }}>
          Cookies
        </Grid>
        <Grid item>-</Grid>
        <Grid item style={{ cursor: "pointer" }}>
          Privacy
        </Grid>
        <Grid item>-</Grid>
        <Grid item style={{ cursor: "pointer" }}>
          Terms
        </Grid>
      </Grid>
    </div>
  );
  const showWhyJoinUs = () => (
    <>
      <Grid
        item
        style={{
          marginTop: "20px",
          marginBottom: "30px",
          marginLeft: "100px",
        }}>
        <Typography variant='caption'>
          About {companyDetails.companyName}
        </Typography>
      </Grid>
      <Grid
        item
        style={{
          marginTop: "20px",
          marginBottom: "50px",
          marginLeft: "100px",
        }}>
        <Typography variant='h5'>
          <b>About the company</b>
        </Typography>
        <Grid container style={{ padding: "40px" }}>
          <Typography
            variant='body2'
            style={{ color: "#767676", textAlign: "left" }}>
            {companyDetails.aboutTheCompany.description}
          </Typography>
        </Grid>
        <Typography variant='h5'>
          <b>Work Culture</b>
        </Typography>
        <Grid container style={{ padding: "40px" }}>
          <Typography
            variant='body2'
            style={{ color: "#767676", textAlign: "left" }}>
            {companyDetails.aboutTheCompany.workCulture}
          </Typography>
        </Grid>
        <Typography variant='h5'>
          <b>Company Values</b>
        </Typography>
        <Grid container style={{ padding: "40px" }}>
          <Typography
            variant='body2'
            style={{ color: "#767676", textAlign: "left" }}>
            {companyDetails.aboutTheCompany.companyValues}
          </Typography>
        </Grid>
      </Grid>
    </>
  );

  return (
    <>
      {(!isAuth || userDetails.role !== 1) && <Redirect to='/login' />}

      <div>
        <Container maxwidth='xl' style={{ marginTop: "5%" }}>
          <div
            class='jumbotron text-white jumbotron-image shadow'
            style={{
              backgroundImage: `url(${companyDetails.companyBanner})`,
              backgroundSize: "cover",
              height: "250px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
            }}></div>
          <Grid
            container
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}>
            <Grid container item lg={6} md={7} sm={8}>
              <Grid item className={classes.imgCont}>
                <img src={companyDetails.companyLogo} alt='' width='100px' />
              </Grid>
              <Grid item style={{ paddingTop: "40px", paddingLeft: "20px" }}>
                <Typography variant='h5'>
                  {companyDetails.companyName}
                </Typography>
              </Grid>
            </Grid>
            <Grid item></Grid>
          </Grid>
          <Grid container style={{ height: "40px" }}>
            <Grid
              item
              className={
                props.match.params.pathname === "company"
                  ? classes.activeTab
                  : classes.optionTab
              }
              onClick={() => changePathName("company")}>
              Company
            </Grid>
            <Grid
              item
              className={
                props.match.params.pathname === "whyjoinus"
                  ? classes.activeTab
                  : classes.optionTab
              }
              onClick={() => changePathName("whyjoinus")}>
              Why Join Us
            </Grid>

            <Grid
              item
              className={
                props.match.params.pathname === "photos"
                  ? classes.activeTab
                  : classes.optionTab
              }
              onClick={() => changePathName("photos")}>
              Photos
            </Grid>
          </Grid>
          <hr style={{ marginTop: 0 }}></hr>
          {props.match.params.pathname === "company" && showCompany()}
          {props.match.params.pathname === "photos" && showPhotos()}
          {props.match.params.pathname === "whyjoinus" && showWhyJoinUs()}
          {showFooter()}
        </Container>

        <Modal
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
          open={photoOpen}
          onClose={handlePhotoClose}>
          <div style={modalStyle} className={classes.photopaper}>
            <form className={classes.formStyle}>
              <label for='file-upload' id='file-drag'>
                <div>
                  <div>Select a file</div>
                  <div>Please select an image</div>
                  <input
                    id='file-upload-2'
                    type='file'
                    name='fileUpload'
                    accept='image/*'
                    multiple
                    onChange={(e) => {
                      let files = [];
                      for (const file of e.target.files) files.push(file);
                      console.log(files);
                      setImage(files);
                    }}
                  />
                </div>
                <button
                  style={{
                    margin: "20px",
                    position: "relative",
                    left: "150px",
                    top: "100px",
                  }}
                  class='btn btn-primary'
                  onClick={filehandler}>
                  Upload
                </button>
              </label>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
}
