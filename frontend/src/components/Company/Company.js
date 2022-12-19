/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  GridList,
  GridListTile,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { API } from "../../config";
import {
  getcompaniesDetails,
  getCompanySpecificReviews,
} from "../../Redux/Actions/Company";
import axios from "axios";
// import { ReviewBox } from "../Review/ReviewBox";
import Header from "../Header/Header";
import StarIcon from "@material-ui/icons/Star";
import { Pagination, Rating } from "@mui/material";
import { ReviewBox } from "./ReviewBox";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import CameraAltIcon from "@material-ui/icons/CameraAltRounded";
import Modal from "@material-ui/core/Modal";
import { TextField } from "@material-ui/core";
import { SearchButton } from "../CompanyReviews/CompanyReviews";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { updateReviewStatus } from "../../Redux/Actions/Company";
import { useremployerAllJob } from "../../Redux/Actions/Company";
import { updateHelpfulCount } from "../../Redux/Actions/Company";
import { updatePhotoStatus } from "../../Redux/Actions/AdminAction";
import { getFeaturedReviews } from "../../Redux/Actions/Company";
import InputGrid from "./InputGrid";
import JobDescription from "./JobDescription";
import { timeDifference } from "./timeDifference";
import { updateViewCount } from "../../Redux/Actions/AdminAction";

import {
  Grid,
  Container,
  makeStyles,
  FormHelperText,
  Box,
  Typography,
  Button,
  withStyles,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  ButtonGroup,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  jobContainer: {
    width: "450px",
  },

  input: {
    width: "100%",
    height: "45px",
  },
  removeMargin: {
    margin: "0",
  },
  searchForm: {
    display: "flex",
    justifyContent: "center",
  },
  btn_Container: {
    display: "flex",
    alignItems: "flex-end",

    "& button": {
      width: "100%",
      height: "45px",
      fontSize: "13px",
      fontWeight: "bold",
      borderRadius: "10px",
    },
  },
  suggestionInput: {
    position: "relative",
  },
  autocontainer: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: "99%",
    backgroundColor: "white",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    zIndex: "10",
    paddingBottom: "30px",
    position: "absolute",
    "& div": {
      marginTop: "30px",
    },
  },
  card: {
    border: "1px solid black",
    padding: "15px",
    cursor: "pointer",
    position: "relative",
    top: "100px",
    left: "50px",
    height: "150x",
    marginBottom: "20px",
    "&:hover": {
      "& $job_title": {
        textDecoration: "underline",
      },
    },
    borderRadius: "10px",
  },
  job_title: {
    fontWeight: "bold",
    fontSize: "20px",
  },
  job_subTitle: {
    fontSize: "16px",
  },
  job_snippet: {
    margin: "20px 0px 10px 0px",
    fontSize: "15px",
    lineHeight: "1.4rem",
  },
  formhelperText: {
    color: "#000000",
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

const FollowButton = withStyles((theme) => ({
  root: {
    color: "#ffffff",
    backgroundColor: "#085ff7",
    cursor: "pointer",
    width: "200px",
    borderRadius: "200px",
    height: "43px",
    marginLeft: "50px",
    "&:hover": {
      backgroundColor: "#0542ac",
    },
  },
}))(Button);
const GreenCheckbox = withStyles({
  root: {
    color: "black",
    "&$checked": {
      color: "black",
    },
    "&$disabled": {
      color: "white",
    },
  },
  checked: {},
  disabled: {},
})(Checkbox);

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

export default function Review(props) {
  let btnRef = useRef();
  const classes = useStyle();
  const [modalStyle] = React.useState(getModalStyle);
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [anyButtonChecked, setanyButtonChecked] = useState([]);
  const [shouldDoJobSerach, setshouldDoJobSerach] = useState(false);
  const { responseFromServer } = useSelector((state) => state.companyDetails);
  const companyDetails = responseFromServer
    ? responseFromServer
    : { aboutTheCompany: {} };
  // const [featuredReview, setFeaturedReview] = useState([]);
  const [triggerUpdateViewCount, settriggerUpdateViewCount] = useState(true);

  let { responseFromServer: jobs, length } = useSelector(
    (state) => state.userjob
  );
  let { companySpecificReviews } = useSelector(
    (state) => state.companyReviewList
  );
  
  let { FeaturedReview } = useSelector(
    (state) => state.featuredReviews
  );
  console.log(FeaturedReview);
  const loginReducer = useSelector((state) => state.login);
  const { isAuth, userDetails } = loginReducer;
  const [images, setImage] = useState([]);
  const [updatePage, setupdatePage] = useState(false);
  const [companyname, setCompanyName] = useState("");
  const [salaryJobTitle, setSalaryJobTitle] = useState("");
  const [newsalary, setNewSalary] = useState("");
  const [salaryLocation, setSalaryLocation] = useState("");
  const [isWorking, setisWorking] = useState("No");

  const handleisWorkingChange = (event) => {
    setisWorking(event.target.value);
    console.log(isWorking);
  };

  const [imageUrl, setImageUrl] = useState([]);

  const [newRating, setnewRating] = useState(0);
  const [reviewSummary, setReviewSummary] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [workHappinessScore, setWorkHappinessScore] = useState(0);
  const [learningScore, setLearningScore] = useState(0);
  const [appreciationScore, setAppreciationScore] = useState(0);
  const [reviewRole, setReviewRole] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [city, setCity] = useState("");
  const [st, setState] = useState("");
  const [photoOpen, setPhotoOpen] = useState(false);
  const [salaryOpen, setSalaryOpen] = useState(false);
  const [joblimit, setJobLimit] = useState(100);
  const [current, setCurrentPage] = useState(1);
  const [reviewsPerPage, setReviewsPerPage] = useState(5);
  // companySpecificReviews = companySpecificReviews.slice(
  //   indexOffirst,
  //   indexOfLastPost
  // );

  // let indexOfLastPost = current * reviewsPerPage;
  // let indexOffirst = indexOfLastPost - reviewsPerPage;

  
  // companySpecificReviews = companySpecificReviews.slice(
  //   indexOffirst,
  //   indexOfLastPost
  // );
  // console.log(companySpecificReviews)

  const [page, setPage] = useState(1);
  const [isfirst, setIsFirst] = useState(true);

  const [values, setValues] = React.useState([
    "select Review Type",
    "Approved",
    "NotApproved",
  ]);
  const [Ratingvalues, setRatingValues] = React.useState([
    "select Rating value",
    1,
    2,
    3,
    4,
    5,
  ]);
  const handleLimit = (e) => {
    setJobLimit(e.target.value);

    setIsFirst(false);
  };
  const handlePage = (e, value) => {
    setPage(value);

    setIsFirst(false);
  };
  let boundary = 0;

  boundary = Math.ceil(length / joblimit);

  const [filterValue, setFilterValue] = React.useState("select Review Type");
  const [ratingfilterValue, setratingFilterValue] = React.useState(
    "select Rating value"
  );
  const [sortValue, setSortValue] = React.useState("createdAt");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(4);
  const [endvalue, setEndValue] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleChange = (newValue) => {
    setEndValue(newValue);
  };

  const query = new URLSearchParams(props.location.search);
  const id = query.get("id");
  const dispatch = useDispatch();
  const getJobDescription = (job) => {
    setJobData(job);
  };

  const [jobData, setJobData] = useState(null);
  const handlePhotoOpen = () => {
    isAuth ? setPhotoOpen(true) : props.history.push("/login");
  };
  const handlePhotoClose = () => {
    setPhotoOpen(false);
  };

  const handleSalaryClose = () => {
    setSalaryOpen(false);
  };

  const handleSalaryOpen = () => {
    setSalaryOpen(true);
  };
  const handlePhotoSatus = (employerId, photoId) => {
    dispatch(updatePhotoStatus({ employerId, photoId }));
  };
  const [interviewPrep, setinterviewPrep] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    isAuth ? setOpen(true) : props.history.push("/login");
  };

  const handleClose = () => {
    setOpen(false);
  };

  // let featuredReview = [];
  // if (companySpecificReviews)
  //   featuredReview = companySpecificReviews.filter(
  //     (val) => val.isFeatured === true
  //   );

  if (companySpecificReviews) {
    //Filtering reviews Based on the approved and user reviews.
    if (!isAuth) {
      let approvedReviews = companySpecificReviews.filter(
        (review) => review.isApproved === "Approved"
      );
      companySpecificReviews = approvedReviews;
    } else if (userDetails.role !== 2) {
      let approvedReviewsFromOtherUsers = [];
      let userReviews = [];
      approvedReviewsFromOtherUsers = companySpecificReviews.filter(
        (review) =>
          review.isApproved === "Approved" &&
          review.userId !== userDetails.userId
      );
      userReviews = companySpecificReviews.filter(
        (review) => review.userId === userDetails.userId
      );
      companySpecificReviews = userReviews.concat(
        approvedReviewsFromOtherUsers
      );
    }
    //sort based on sort value
    if (sortValue !== "createdAt") {
      debugger;
      if (sortValue === "overallRating") {
        companySpecificReviews.sort(function (a, b) {
          return b.overallRating - a.overallRating;
        });
      } else {
        companySpecificReviews.sort(function (a, b) {
          return b.isHelpfulCount - a.isHelpfulCount;
        });
      }
    }
  }
  // //Filter based on review ratings
  if (companySpecificReviews && ratingfilterValue !== "select Rating value") {
    companySpecificReviews = companySpecificReviews.filter(
      (review) => review.overallRating === ratingfilterValue
    );
  }

  //Filter based on approved or not approved
  if (filterValue === "Approved") {
    companySpecificReviews = companySpecificReviews.filter(
      (review) => review.isApproved === "Approved"
    );
  } else if (filterValue === "NotApproved") {
    companySpecificReviews = companySpecificReviews.filter(
      (review) => review.isApproved === "NotApproved"
    );
  }
  

  //Filter on jobs
  if (jobTitle && location && shouldDoJobSerach) {
    jobs = jobs.filter(
      (row) =>
        row.jobTitle.toLowerCase().indexOf(jobTitle.toLowerCase()) > -1 ||
        row.jobLocation.city.indexOf(location.toLowerCase()) > -1
    );

    console.log(jobs);
  } else if (jobTitle && shouldDoJobSerach) {
    jobs = jobs.filter(
      (row) => row.jobTitle.toLowerCase().indexOf(jobTitle.toLowerCase()) > -1
    );

    console.log(jobs);
  } else if (location && shouldDoJobSerach) {
    jobs = jobs.filter(
      (row) =>
        row.jobLocation.city.toLowerCase().indexOf(location.toLowerCase()) > -1
    );

    console.log(jobs);
  }

  const [tooltipopen, setTooltipopen] = React.useState(true);

  useEffect(() => {
    debugger;
    if (
      props.match.params.pathname === "snapshot" ||
      props.match.params.pathname === "photos"
    ) {
      dispatch(getcompaniesDetails({ employerID: props.match.params.id }));
      dispatch(getFeaturedReviews({employerId: props.match.params.id}));
     
    } else if (props.match.params.pathname === "reviews")
      dispatch(
        getCompanySpecificReviews({
          employerId: props.match.params.id,
          sort: sortValue,
        })
      );
    else if (props.match.params.pathname === "jobs")
      dispatch(useremployerAllJob(props.match.params.id, page, joblimit));
    setRating(companyDetails.noOfRatings);
    debugger;
    if(triggerUpdateViewCount && (!isAuth || (userDetails && (userDetails.userId !== props.match.params.id && userDetails.role !== 2)))){
      dispatch(updateViewCount({employerId: props.match.params.id }));
      settriggerUpdateViewCount(false);
    }

    
  }, [props.match, updatePage, sortValue, filterValue, page, joblimit]);

  const changePathName = (pathName) => {
    props.history.push(`/company/${props.match.params.id}/${pathName}`);
  };
  const handleSort = (val) => {
    setSortValue(val);
  };
  const filehandler = async (event) => {
    event.preventDefault();

    let urls = [];
    for (let i = 0; i < images.length; i++) {
      let file = images[i];
      const formData = new FormData();
      console.log(file);
      formData.append("file", file);
      formData.append("upload_preset", "indeed");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/dgqlka0rq/image/upload",
          formData
        )
        .then((res) => {
          console.log(res.data.secure_url);
          urls.push(res.data.secure_url);
          if (urls.length === images.length) {
            axios
              .post(`${API}/company/uploadphoto`, {
                urls,
                userId: userDetails.userId,
                employerId: props.match.params.id,
              })
              .then((res) => {
                setPhotoOpen(false);
                console.log(res);
                dispatch(getcompaniesDetails({ employerID: res.data._id }));
              });
          }
        });
    }
  };
  const changeToApproved = (id) => {
    dispatch(updateReviewStatus({ reviewid: id }));
  };
  const handleHelpfulCount = (reviewid, helpfulcount, nothelpfulcount) => {
    dispatch(updateHelpfulCount({ reviewid, helpfulcount, nothelpfulcount }));
  };
  const handleJobSearch = (event) => {
    event.preventDefault();

    if (jobTitle && location) {
      jobs = jobs.filter(
        (row) =>
          row.jobTitle.toLowerCase().indexOf(jobTitle.toLowerCase()) > -1 ||
          row.jobLocation.city.indexOf(location.toLowerCase()) > -1
      );

      console.log(jobs);
    } else if (jobTitle) {
      jobs = jobs.filter(
        (row) => row.jobTitle.toLowerCase().indexOf(jobTitle.toLowerCase()) > -1
      );

      console.log(jobs);
    } else if (location) {
      jobs = jobs.filter(
        (row) =>
          row.jobLocation.city.toLowerCase().indexOf(location.toLowerCase()) >
          -1
      );
    }
    setshouldDoJobSerach(true);
  };

  const salarySubmithandler = async (event) => {
    event.preventDefault();
    const obj = {
      jobTitle: salaryJobTitle,
      currentPay: newsalary,
      companyName: companyname,
      jobLocation: salaryLocation,
    };
    console.log(obj);
    await axios
      .post(`${API}/company/user-salary`, { ...obj })
      .then((response) => {
        setSalaryOpen(false);
        setCompanyName("");
        setSalaryJobTitle("");
        setNewSalary("");
        setSalaryLocation("");
      });
  };

  const switchJobSearch = () => {
    setshouldDoJobSerach(false);
  };
  const reviewSubmithandler = async (event) => {
    setupdatePage(!updatePage);
    event.preventDefault();
    console.log(cons);
    await axios
      .post(`${API}/company/user-review`, {
        overallRating: newRating,
        workHappinessScore,
        learningScore,
        appreciationScore,
        reviewRole,
        reviewTitle,
        city,
        state: st,
        yourReview: reviewSummary,
        employerId: props.match.params.id,
        userId: userDetails.userId,
        pros: pros,
        cons: cons,
        interviewPreparation: interviewPrep,
      })
      .then((response) => {
        console.log(response.data);
        setOpen(false);
        setnewRating(0);
        setReviewSummary("");
        setPros("");
        setCons("");
        setWorkHappinessScore(0);
        setLearningScore(0);
        setAppreciationScore(0);
        setReviewRole("");
        setReviewTitle("");
        setCity("");
        setState("");
        setinterviewPrep("");
        dispatch(
          getCompanySpecificReviews({
            employerId: props.match.params.id,
            sort: sortValue,
          })
        );
      })
      .catch((error) => {});
  };

  //SnapShot page strats here
  const showSnapShot = () => (
    <div>
      <Grid item style={{ marginTop: "20px", marginBottom: "30px" }}>
        <Typography variant="caption">
          {companyDetails.companyName} Careers and Employment
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Typography variant="h5">
          <b>Work happiness</b>
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: "20px", marginBottom: "30px" }}>
        <Typography variant="caption">
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
          }}
        >
          <Typography variant="">
            <HtmlTooltip
              open={tooltipopen}
              title="Do people feel happy at work most of the time?"
              arrow
            >
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
          }}
        >
          <Typography variant="">
            <HtmlTooltip
              open={tooltipopen}
              title="Do people feel they are achieving most of their goals at work?"
              arrow
            >
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
          }}
        >
          <Typography variant="">
            <HtmlTooltip
              open={tooltipopen}
              title="Do people feel they often learn something at work?"
              arrow
            >
              <b>{companyDetails.averageLearningScore}</b>
            </HtmlTooltip>
          </Typography>{" "}
          <b>Learning</b>
        </Grid>
      </Grid>
      <Grid item style={{ marginTop: "100px", marginBottom: "50px" }}>
        <Typography variant="h5">
          <b>About the company</b>
        </Typography>
      </Grid>
      <Grid container spacing={1}>
        <Grid item style={{ flex: 1 }}>
          <Image
            src={companyDetails.companyCeoPicture}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://dummyimage.com/100.png/09f/fff";
            }}
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
            }}
          >
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
            }}
          >
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
            }}
          >
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
            }}
          >
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
            }}
          >
            <div style={{ fontWeight: "600" }}>Founded</div>
            <br />
            <br />
            <div style={{}}>{companyDetails.aboutTheCompany.founded}</div>
          </Grid>
        </Grid>
      </Grid>
      <Grid container style={{ padding: "40px" }}>
        <Typography
          variant="body2"
          style={{ color: "#767676", textAlign: "left" }}
        >
          {companyDetails.aboutTheCompany.description}
          <Typography
            variant="body2"
            style={{ color: "#767676", textAlign: "left" }}
          >
            {companyDetails.aboutTheCompany.misssionandvisson}
          </Typography>
        </Typography>
      </Grid>
      <Grid item style={{ marginBottom: "50px" }}>
        <Typography variant="h5" style={{ marginBottom: "50px" }}>
          <b>Featured Reviews</b>
        </Typography>
        {FeaturedReview &&
          FeaturedReview.map((item) => (
            <ReviewBox
              key={item.id}
              rating={item.overallRating}
              review_title={item.reviewTitle}
              date={item.date}
              yourReview={item.yourReview}
              pros={item.pros}
              cons={item.cons}
              helpfulCount={item.isHelpfulCount}
              isApproved={item.isApproved}
              isAuth={isAuth}
              userRole={userDetails.role}
            />
          ))}
      </Grid>
    </div>
  );
  const showReviews = () => (
    <div class="container-fluid">
      <Typography variant="h4">
        <b>{companyDetails.companyName} Employee Reviews</b>
      </Typography>
      <Grid
        item
        style={{
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "50px",
          backgroundColor: "#d3d3d34f",
          height: "100px",
          boxShadow:
            "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
        }}
      >
        <FormControl>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            style={{ padding: "35px" }}
          >
            <Button value="Rating" onClick={(e) => handleSort("overallRating")}>
              Rating
            </Button>
            <Button
              value="Helpfullness"
              onClick={(e) => handleSort("isHelpfulCount")}
            >
              Helpfullness
            </Button>
            <Button value="Date" onClick={(e) => handleSort("createdAt")}>
              Date
            </Button>
          </ButtonGroup>
        </FormControl>
        <FormControl style={{ padding: "37px" }}>
          <Select
            className={classes.outlinedInput}
            variant="outlined"
            value={filterValue}
            name="filterVal"
            onChange={(e) => setFilterValue(e.target.value)}
            style={{ height: "30px", width: "189px" }}
          >
            {values.map((value, index) => {
              return <MenuItem value={value}>{value}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl style={{ padding: "37px", paddingLeft: "50px" }}>
          <Select
            className={classes.outlinedInput}
            variant="outlined"
            value={ratingfilterValue}
            name="ratingfilterVal"
            onChange={(e) => setratingFilterValue(e.target.value)}
            style={{ height: "30px", width: "189px" }}
          >
            {Ratingvalues.map((value, index) => {
              return <MenuItem value={value}>{value}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Grid>
      {companySpecificReviews && (
        <div>
          <Grid item style={{ marginTop: "30px", marginBottom: "50px" }}>
            <Typography>
              Found <b>{companySpecificReviews.length}</b> reviews matching the
              search
            </Typography>
          </Grid>
          <Grid container spacing={10}>
            {companySpecificReviews &&
              companySpecificReviews.map((item, index) => {
                return (
                  <>
                    <Grid
                      item
                      container
                      spacing={4}
                      style={{ borderBottom: "#00000029 solid 1px" }}
                    >
                      <Grid item container spacing={1}>
                        <Grid item style={{ width: "57px" }}>
                          <h4 style={{ borderBottom: "3px dotted #000" }}>
                            {item.overallRating}.0
                          </h4>

                          <Rating
                            name="size-small"
                            style={{ color: "#9d2b6b" }}
                            value={item.overallRating}
                            size="small"
                            precision={0.5}
                            readOnly
                          />
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="head2"
                            style={{ fontWeight: "800" }}
                          >
                            {item.reviewTitle}
                          </Typography>
                          {"  "}
                          {userDetails.userId === item.userId && (
                            <i class="fas fa-user"></i>
                          )}{" "}
                          {item.isApproved === "NotApproved" ? (
                            <button
                              type="button"
                              disabled="true"
                              class="btn btn-danger"
                              style={{
                                height: "26px",
                                fontWeight: "200",
                                fontSize: "small",
                                padding: "4px",
                              }}
                            >
                              <i
                                class="fa fa-times"
                                aria-hidden="true"
                                style={{ color: "white" }}
                              ></i>{" "}
                              Not Verified
                            </button>
                          ) : (
                            <button
                              type="button"
                              class="btn btn-success"
                              disabled="true"
                              style={{
                                height: "26px",
                                fontWeight: "200",
                                fontSize: "small",
                                padding: "4px",
                              }}
                            >
                              <i
                                class="fas fa-check"
                                style={{ color: "white" }}
                              ></i>{" "}
                              verified
                            </button>
                          )}
                        </Grid>
                      </Grid>
                      <Grid item container spacing={3}>
                        <Typography
                          variant="subtitle1"
                          style={{ marginLeft: "20px" }}
                        >
                          {item.yourReview}
                        </Typography>
                      </Grid>
                      <Grid item container spacing={3}>
                        <span>
                          <i
                            class="fas fa-check"
                            style={{ color: "green" }}
                          ></i>
                        </span>
                        <div spacing={3}>
                          <b> Pros </b>
                        </div>
                        <br></br>
                      </Grid>
                      <Grid item container spacing={3}>
                        <Typography
                          variant="subtitle1"
                          style={{ marginLeft: "20px" }}
                        >
                          {item.pros}
                        </Typography>
                      </Grid>
                      <Grid item container spacing={3}>
                        <i
                          class="fa fa-times"
                          aria-hidden="true"
                          style={{ color: "red" }}
                        ></i>
                        <br></br>
                        <div spacing={3}>
                          <b>Cons </b>{" "}
                        </div>
                      </Grid>

                      <Grid item container spacing={3}>
                        <Typography
                          variant="subtitle1"
                          style={{ marginLeft: "20px" }}
                        >
                          {item.isApprovedcons}
                        </Typography>
                      </Grid>

                      {userDetails.role !== 2 && (
                        <>
                          <span style={{ fontSize: "small" }}>
                            Was this review helpfull?
                          </span>
                          <Grid item container spacing={3}>
                            <FormControl>
                              <ButtonGroup
                                variant="outlined"
                                aria-label="outlined button group"
                                style={{ padding: "1px" }}
                              >
                                <Button
                                  ref={btnRef}
                                  id={item._id}
                                  value="yes"
                                  disabled={
                                    item.userId === userDetails.userId ||
                                    anyButtonChecked[index]
                                  }
                                  onClick={(e) => {
                                    anyButtonChecked[index] = true;
                                    item.isHelpfulCount =
                                      item.isHelpfulCount + 1;
                                    handleHelpfulCount(
                                      item._id,
                                      item.isHelpfulCount,
                                      item.isNotHelpfulCount
                                    );
                                  }}
                                >
                                  Yes {item.isHelpfulCount}
                                </Button>
                                <Button
                                  value="no"
                                  disabled={
                                    item.userId === userDetails.userId ||
                                    anyButtonChecked[index]
                                  }
                                  onClick={(e) => {
                                    anyButtonChecked[index] = true;
                                    item.isNotHelpfulCount =
                                      item.isNotHelpfulCount + 1;
                                    e.target.disabled = true;
                                    handleHelpfulCount(
                                      item._id,
                                      item.isHelpfulCount,
                                      item.isNotHelpfulCount
                                    );
                                  }}
                                >
                                  No {item.isNotHelpfulCount}
                                </Button>
                              </ButtonGroup>
                            </FormControl>
                          </Grid>
                        </>
                      )}

                      {isAuth &&
                        userDetails.role == 2 &&
                        item.isApproved === "NotApproved" && (
                          <span>
                            <button
                              type="button"
                              class="btn btn-info"
                              onClick={() => {
                                item.isApproved = "Approved";
                                changeToApproved(item._id);
                              }}
                            >
                              Verify this review
                            </button>
                          </span>
                        )}
                    </Grid>
                  </>
                  // <ReviewBox
                  //   key={item.id}
                  //   rating={item.overallRating}
                  //   review_title={item.reviewTitle}
                  //   date={item.date}
                  //   yourReview={item.yourReview}
                  //   pros={item.pros}
                  //   cons={item.cons}
                  //   helpfulCount={item.isHelpfulCount}
                  //   isApproved = {item.isApproved}
                  //   isAuth={isAuth}
                  //   userRole = {userDetails.role}
                  //   id = {item._id}
                  //   sortVal={sortValue}
                  //   filterValue = {filterValue}
                  // />
                );
              })}
          </Grid>
          <Grid>

          </Grid>
         
        </div>
      )}
    </div>
  );
  const showPhotos = () => (
    <div className="row">
      <div className="col-md-9">
        <Grid item style={{ marginTop: "20px", marginBottom: "50px" }}>
          <span>
            <CameraAltIcon></CameraAltIcon>{" "}
            <b>{companyDetails && companyDetails.companyName} Photos</b>
          </span>
        </Grid>
        {isAuth ? (
          <>
            {userDetails && userDetails.role === 2 ? (
              <>
                <GridList
                  cellHeight={200}
                  cols={3}
                  style={{ width: 800, height: 600 }}
                >
                  {companyDetails &&
                    companyDetails.photos.map((data) => (
                      <GridListTile key={data.id}>
                        <img src={data.path} alt={data.status} />
                        {data.status ? (
                          <>
                            <button
                              type="button"
                              class="btn btn-success"
                              disabled="true"
                              style={{
                                height: "26px",
                                fontWeight: "200",
                                fontSize: "small",
                                padding: "4px",
                                position: "absolute",
                                top: "2px",
                                right: "0px",
                              }}
                            >
                              <i
                                class="fas fa-check"
                                style={{ color: "white" }}
                              ></i>{" "}
                              verified
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              class="btn btn-info"
                              style={{
                                height: "26px",
                                fontWeight: "200",
                                fontSize: "small",
                                padding: "4px",
                                position: "absolute",
                                top: "2px",
                                right: "0px",
                              }}
                              onClick={() => {
                                data.status = true;
                                handlePhotoSatus(companyDetails._id, data._id);
                              }}
                            >
                              Verify here
                            </button>
                          </>
                        )}
                      </GridListTile>
                    ))}
                </GridList>
              </>
            ) : (
              <>
                <GridList
                  cellHeight={200}
                  cols={3}
                  style={{ width: 800, height: 600 }}
                >
                  {companyDetails &&
                    companyDetails.photos &&
                    companyDetails.photos.map(
                      (data) =>
                        data.userId === userDetails.userId && (
                          <GridListTile key={data.id}>
                            <img
                              src={data.path}
                              alt={data.status}
                              style={{ position: "relative", height: "200px" }}
                            />
                            {data.status ? (
                              <>
                                <button
                                  type="button"
                                  class="btn btn-success"
                                  disabled="true"
                                  style={{
                                    height: "26px",
                                    fontWeight: "200",
                                    fontSize: "small",
                                    padding: "4px",
                                    position: "absolute",
                                    top: "2px",
                                    right: "0px",
                                  }}
                                >
                                  <i
                                    class="fas fa-check"
                                    style={{ color: "white" }}
                                  ></i>{" "}
                                  verified
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  class="btn btn-danger"
                                  disabled="true"
                                  style={{
                                    height: "26px",
                                    fontWeight: "200",
                                    fontSize: "small",
                                    padding: "4px",
                                    position: "absolute",
                                    top: "2px",
                                    right: "0px",
                                  }}
                                >
                                  <i
                                    class="fa fa-times"
                                    aria-hidden="true"
                                    style={{ color: "white" }}
                                  ></i>{" "}
                                  Not Verified
                                </button>
                              </>
                            )}
                          </GridListTile>
                        )
                    )}
                  {companyDetails &&
                    companyDetails.photos.map(
                      (data) =>
                        data.status &&
                        data.userId !== userDetails.userId && (
                          <>
                            <GridListTile key={data.id}>
                              <img
                                src={data.path}
                                alt={data.status}
                                style={{
                                  position: "relative",
                                  height: "200px",
                                }}
                              />
                              <button
                                type="button"
                                class="btn btn-success"
                                disabled="true"
                                style={{
                                  height: "26px",
                                  fontWeight: "200",
                                  fontSize: "small",
                                  padding: "4px",
                                  position: "absolute",
                                  top: "2px",
                                  right: "0px",
                                }}
                              >
                                <i
                                  class="fas fa-check"
                                  style={{ color: "white" }}
                                ></i>{" "}
                                verified
                              </button>
                            </GridListTile>
                          </>
                        )
                    )}
                </GridList>
              </>
            )}
          </>
        ) : (
          <GridList
            cellHeight={200}
            cols={3}
            style={{ width: 800, height: 600 }}
          >
            {companyDetails &&
              companyDetails.photos &&
              companyDetails.photos.map(
                (data) =>
                  data.status && (
                    <GridListTile key={data.id}>
                      <img
                        src={data.path}
                        alt={data.status}
                        style={{ position: "relative" }}
                      />
                      <button
                        type="button"
                        class="btn btn-success"
                        disabled="true"
                        style={{
                          height: "26px",
                          fontWeight: "200",
                          fontSize: "small",
                          padding: "4px",
                          position: "absolute",
                          top: "2px",
                          right: "0px",
                        }}
                      >
                        <i class="fas fa-check" style={{ color: "white" }}></i>{" "}
                        verified
                      </button>
                    </GridListTile>
                  )
              )}
          </GridList>
        )}
      </div>
      {userDetails && userDetails.role !== 2 && (
        <UplaodButton
          type="submit"
          variant="contained"
          onClick={handlePhotoOpen}
        >
          Upload photo
        </UplaodButton>
      )}
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
        }}
      >
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
  const showSalary = () => (
    <>
      {userDetails && userDetails.role !== 2 && (
        <SearchButton
          type="submit"
          variant="contained"
          style={{ position: "relative", left: "800px" }}
          onClick={handleSalaryOpen}
        >
          Add a Salary
        </SearchButton>
      )}
    </>
  );
  const showWhyJoinUs = () => (
    <>
      <Grid
        item
        style={{
          marginTop: "20px",
          marginBottom: "30px",
          marginLeft: "100px",
        }}
      >
        <Typography variant="caption">
          About {companyDetails.companyName}
        </Typography>
      </Grid>
      <Grid
        item
        style={{
          marginTop: "20px",
          marginBottom: "50px",
          marginLeft: "100px",
        }}
      >
        <Typography variant="h5">
          <b>About the company</b>
        </Typography>
        <Grid container style={{ padding: "40px" }}>
          <Typography
            variant="body2"
            style={{ color: "#767676", textAlign: "left" }}
          >
            {companyDetails.aboutTheCompany.description}
          </Typography>
        </Grid>
        <Typography variant="h5">
          <b>Work Culture</b>
        </Typography>
        <Grid container style={{ padding: "40px" }}>
          <Typography
            variant="body2"
            style={{ color: "#767676", textAlign: "left" }}
          >
            {companyDetails.aboutTheCompany.workCulture}
          </Typography>
        </Grid>
        <Typography variant="h5">
          <b>Company Values</b>
        </Typography>
        <Grid container style={{ padding: "40px" }}>
          <Typography
            variant="body2"
            style={{ color: "#767676", textAlign: "left" }}
          >
            {companyDetails.aboutTheCompany.companyValues}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
  const showJobs = () => (
    <>
      <form onSubmit={handleJobSearch} className={classes.searchForm}>
        <Grid container spacing={1}>
          <InputGrid
            setValue={setJobTitle}
            value={jobTitle}
            label={"What?"}
            helperText={"Job Title"}
            classes={classes}
            switchJobSearch={switchJobSearch}
          />

          <InputGrid
            setValue={setLocation}
            value={location}
            label={"Where"}
            helperText="Location"
            classes={classes}
            switchJobSearch={switchJobSearch}
          />

          <Grid
            item
            lg={2}
            md={2}
            sm={2}
            xs={12}
            className={classes.btn_Container}
          >
            <Button color={"primary"} variant="contained" type="submit">
              Find Jobs
            </Button>
          </Grid>
        </Grid>
      </form>

      <Box style={{ display: "flex" }}>
        <Grid className={classes.jobContainer} container>
          {jobs &&
            jobs.map((job) => (
              <Grid
                className={classes.card}
                item
                key={job._id}
                lg={12}
                md={12}
                sm={12}
                xs={12}
              >
                <Box onClick={() => getJobDescription(job)}>
                  <Typography className={classes.job_title}>
                    {job.jobTitle}
                  </Typography>
                  <Typography className={classes.job_subTitle}>
                    {job.jobLocation.city}
                  </Typography>
                  <Typography className={classes.greyText}>
                    {timeDifference(new Date(job.timeStamp).getTime())}
                  </Typography>
                </Box>
              </Grid>
            ))}
        </Grid>
        {jobData ? <JobDescription jobData={jobData} /> : <></>}
      </Box>
      <Grid container style={{ margin: "100px 0px" }}>
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
      <Box style={{ marginTop: "30px" }}></Box>
    </>
  );
  return (
    <div>
      <Header />
      <Container maxwidth="xl">
        <div
          class="jumbotron text-white jumbotron-image shadow"
          style={{
            backgroundImage: `url(${companyDetails.companyBanner})`,
            backgroundSize: "cover",
            height: "250px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        ></div>
        <Grid
          container
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Grid container item lg={6} md={7} sm={8}>
            <Grid item className={classes.imgCont}>
              <Image
                src={companyDetails.companyLogo}
                alt=""
                width="100px"
                onError={(e) => {
                  this.src = "https://dummyimage.com/100.png/09f/fff";
                }}
              />
            </Grid>
            <Grid item style={{ paddingTop: "40px", paddingLeft: "20px" }}>
              <Typography variant="h5">{companyDetails.companyName}</Typography>
              <Typography variant="h5">
                {companyDetails.averageRating}
                {/* <StarIcon style = {{color: "#9d2b6b", paddingRight: "10px"}}/> */}
                <Rating
                  name="half-rating-read"
                  style={{ color: "#9d2b6b", paddingRight: "10px" }}
                  value={rating}
                  precision={0.5}
                  readOnly
                />
                {companyDetails.noOfRatings && (
                  <Typography variant="caption">
                    {" "}
                    {companyDetails.noOfRatings} reviews
                  </Typography>
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            {userDetails && userDetails.role !== 2 && (
              <Button
                color={"primary"}
                variant="contained"
                type="submit"
                onClick={handleOpen}
              >
                {" "}
                Review this Company{" "}
              </Button>
            )}

            <br />
            {/* <Typography variant="caption" >Get weekly updates, new jobs, and reviews</Typography> */}
          </Grid>
        </Grid>

        <Grid container style={{ height: "40px", paddingLeft: "15%" }}>
          <Grid
            item
            className={
              props.match.params.pathname === "snapshot"
                ? classes.activeTab
                : classes.optionTab
            }
            onClick={() => changePathName("snapshot")}
          >
            SnapShot
          </Grid>
          {userDetails && userDetails.role !== 2 && (
            <Grid
              item
              className={
                props.match.params.pathname === "whyjoinus"
                  ? classes.activeTab
                  : classes.optionTab
              }
              onClick={() => changePathName("whyjoinus")}
            >
              Why Join Us
            </Grid>
          )}

          <Grid
            item
            className={
              props.match.params.pathname === "reviews"
                ? classes.activeTab
                : classes.optionTab
            }
            onClick={() => changePathName("reviews")}
          >
            Reviews
          </Grid>
          {userDetails && userDetails.role !== 2 && (
            <Grid
              item
              className={
                props.match.params.pathname === "salaries"
                  ? classes.activeTab
                  : classes.optionTab
              }
              onClick={() => changePathName("salaries")}
            >
              Salaries
            </Grid>
          )}

          <Grid
            item
            className={
              props.match.params.pathname === "photos"
                ? classes.activeTab
                : classes.optionTab
            }
            onClick={() => changePathName("photos")}
          >
            Photos
          </Grid>
          {userDetails && userDetails.role !== 2 && (
            <Grid
              item
              className={
                props.match.params.pathname === "jobs"
                  ? classes.activeTab
                  : classes.optionTab
              }
              onClick={() => changePathName("jobs")}
            >
              Jobs
            </Grid>
          )}

          {/* <Grid
            item
            className={
              props.match.params.pathname === "qanda"
                ? classes.activeTab
                : classes.optionTab
            }
            onClick={() => changePathName("qanda")}
          >
            Q&A
          </Grid>
          <Grid
            item
            className={
              props.match.params.pathname === "interviews"
                ? classes.activeTab
                : classes.optionTab
            }
            onClick={() => changePathName("interviews")}
          >
            Interviews
          </Grid> */}
        </Grid>
        <hr style={{ marginTop: 0 }}></hr>
        {props.match.params.pathname === "snapshot" && showSnapShot()}
        {props.match.params.pathname === "reviews" && showReviews()}
        {props.match.params.pathname === "photos" && showPhotos()}
        {props.match.params.pathname === "whyjoinus" && showWhyJoinUs()}
        {props.match.params.pathname === "jobs" &&
          userDetails.role !== 2 &&
          showJobs()}
        {props.match.params.pathname === "salaries" && showSalary()}
        {showFooter()}
      </Container>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className={classes.formStyle} onSubmit={reviewSubmithandler}>
            <Grid>
              <FormHelperText className={classes.formhelperText}>
                <span style={{ margin: "0px 15px" }}>Overall Rating </span>
                <span style={{ margin: "0px 15px" }}>Work Happiness Score</span>
                <span style={{ margin: "0px 15px" }}>Learning Score</span>
                <span style={{ margin: "0px 15px" }}>Appreciation</span>
              </FormHelperText>
              <span style={{ margin: "0px 25px" }}>
                <Rating
                  name="simple-controlled"
                  value={newRating}
                  onChange={(event, newValue) => {
                    setnewRating(newValue);
                  }}
                />
              </span>
              <span style={{ margin: "0px 25px" }}>
                <Rating
                  name="simple-controlled"
                  value={workHappinessScore}
                  onChange={(event, newValue) => {
                    setWorkHappinessScore(newValue);
                  }}
                />
              </span>
              <span style={{ margin: "0px 45px" }}>
                <Rating
                  name="simple-controlled"
                  value={learningScore}
                  onChange={(event, newValue) => {
                    setLearningScore(newValue);
                  }}
                />
              </span>
              <span>
                <Rating
                  name="simple-controlled"
                  value={appreciationScore}
                  onChange={(event, newValue) => {
                    setAppreciationScore(newValue);
                  }}
                />
              </span>
            </Grid>
            <Grid>
              <FormHelperText className={classes.formhelperText}>
                <span style={{ margin: "0px 10px" }}>Review Title </span>
                <span style={{ margin: "0px 50px" }}>Review Role</span>
                <span style={{ margin: "0px 60px" }}>City</span>
                <span style={{ margin: "0px 70px" }}>State</span>
              </FormHelperText>
              <TextField
                type="text"
                style={{ width: "150px" }}
                value={reviewTitle}
                required
                onChange={(event) => {
                  setReviewTitle(event.target.value);
                }}
                variant="outlined"
                placeholder="Review Title"
              />
              <TextField
                type="text"
                required
                style={{ width: "150px", margin: "0px 35px" }}
                value={reviewRole}
                onChange={(event) => {
                  setReviewRole(event.target.value);
                }}
                variant="outlined"
                placeholder="Review Role"
              />
              <TextField
                type="text"
                required
                style={{ width: "150px", margin: "0px 10px" }}
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
                variant="outlined"
                placeholder="City"
              />
              <TextField
                type="text"
                required
                style={{ width: "150px" }}
                value={st}
                onChange={(event) => {
                  setState(event.target.value);
                }}
                variant="outlined"
                placeholder="State"
              />
            </Grid>
            <Grid>
              <FormHelperText className={classes.formhelperText}>
                Review Summary
              </FormHelperText>
              <TextField
                className={classes.outlinedInput}
                required
                type="text"
                multiline
                rows={3}
                rowsMax={4}
                value={reviewSummary}
                onChange={(event) => {
                  setReviewSummary(event.target.value);
                }}
                variant="outlined"
                placeholder="Review Summary"
              />
            </Grid>
            <Grid>
              <FormHelperText className={classes.formhelperText}>
                Pros
              </FormHelperText>
              <TextField
                className={classes.outlinedInput}
                required
                multiline
                rows={2}
                rowsMax={4}
                value={pros}
                onChange={(event) => {
                  setPros(event.target.value);
                }}
                type="text"
                variant="outlined"
                placeholder="Pros"
              />
            </Grid>
            <Grid>
              <FormHelperText className={classes.formhelperText}>
                Cons
              </FormHelperText>
              <TextField
                className={classes.outlinedInput}
                required
                multiline
                rows={2}
                rowsMax={4}
                type="text"
                value={cons}
                onChange={(event) => {
                  setCons(event.target.value);
                }}
                variant="outlined"
                placeholder="Cons"
              />
            </Grid>
            <Grid>
              <FormHelperText className={classes.formhelperText}>
                Interview Preparation
              </FormHelperText>
              <TextField
                className={classes.outlinedInput}
                required
                multiline
                rows={2}
                rowsMax={4}
                type="text"
                value={interviewPrep}
                onChange={(event) => {
                  setinterviewPrep(event.target.value);
                }}
                variant="outlined"
                placeholder="   Interview Preparation"
              />
            </Grid>
            <br />
            <Grid>
              <SearchButton type="submit" variant="contained">
                Post
              </SearchButton>
            </Grid>
          </form>
        </div>
      </Modal>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={photoOpen}
        onClose={handlePhotoClose}
      >
        <div style={modalStyle} className={classes.photopaper}>
          <form className={classes.formStyle}>
            <label for="file-upload" id="file-drag">
              <div>
                <div>Select a file</div>
                <div>Please select an image</div>

                <input
                  id="file-upload"
                  type="file"
                  name="fileUpload"
                  accept="image/*"
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
                class="btn btn-primary"
                onClick={filehandler}
              >
                Upload
              </button>
            </label>
          </form>
        </div>
      </Modal>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={salaryOpen}
        onClose={handleSalaryClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className={classes.formStyle} onSubmit={salarySubmithandler}>
            <Grid style={{ height: "80px" }}>
              <FormHelperText className={classes.formhelperText}>
                What's Your Company ?
              </FormHelperText>
              <TextField
                className={classes.outlinedInput}
                required
                type="text"
                value={companyname}
                required
                onChange={(event) => {
                  setCompanyName(event.target.value);
                }}
                variant="outlined"
                placeholder=""
              />
            </Grid>
            <Grid style={{ height: "80px" }}>
              <FormHelperText className={classes.formhelperText}>
                Are you Currently working ?
              </FormHelperText>

              <RadioGroup
                aria-label="Working"
                row
                name="controlled-radio-buttons-group"
                value={isWorking}
                onChange={handleisWorkingChange}
              >
                <FormControlLabel value="No" control={<Radio />} label="Yes" />
                <FormControlLabel value="Yes" control={<Radio />} label="No" />
              </RadioGroup>
              {isWorking === "Yes" && (
                <div
                  style={{
                    position: "relative",
                    left: "350px",
                    bottom: "80px",
                    marginBottom: "0px",
                  }}
                >
                  <FormHelperText className={classes.formhelperText}>
                    End Date
                  </FormHelperText>
                  <input type="date" className={classes.formhelperText} />
                </div>
              )}
            </Grid>

            <Grid style={{ height: "80px" }}>
              <FormHelperText className={classes.formhelperText}>
                Whats Your Job Title?
              </FormHelperText>
              <TextField
                className={classes.outlinedInput}
                type="text"
                required
                variant="outlined"
                placeholder="Job Title"
                value={salaryJobTitle}
                onChange={(event) => {
                  setSalaryJobTitle(event.target.value);
                }}
              />
            </Grid>

            <Grid style={{ height: "80px" }}>
              <FormHelperText className={classes.formhelperText}>
                Pay
              </FormHelperText>
              <TextField
                className={classes.outlinedInput}
                type="text"
                required
                variant="outlined"
                placeholder="Current Pay"
                value={newsalary}
                onChange={(event) => {
                  setNewSalary(event.target.value);
                }}
              />
            </Grid>
            <Grid style={{ height: "80px" }}>
              <FormHelperText className={classes.formhelperText}>
                Beneifts
              </FormHelperText>
              <FormGroup>
                <FormControlLabel
                  style={{ height: "25px" }}
                  control={<GreenCheckbox />}
                  label="Paid time off"
                />
                <FormControlLabel
                  style={{ height: "25px" }}
                  control={<GreenCheckbox />}
                  label="Health insurance"
                />
                <FormControlLabel
                  style={{ height: "25px" }}
                  control={<GreenCheckbox />}
                  label="Life insurance"
                />
                <FormControlLabel
                  style={{ height: "25px" }}
                  control={<GreenCheckbox />}
                  label="Dental/ vision insurance"
                />
                <FormControlLabel
                  style={{ height: "25px" }}
                  control={<GreenCheckbox />}
                  label="Retirement/ 401(k)"
                />
                <FormControlLabel
                  style={{ height: "25px" }}
                  control={<GreenCheckbox />}
                  label="Other benefits"
                />
              </FormGroup>
            </Grid>
            <Grid
              style={{
                height: "80px",
                position: "relative",
                top: "150px",
                width: "50px",
              }}
            >
              <FormHelperText className={classes.formhelperText}>
                Location
              </FormHelperText>
              <TextField
                className={classes.outlinedInput}
                style={{ width: "150px" }}
                required
                type="text"
                variant="outlined"
                placeholder="Location"
                value={salaryLocation}
                onChange={(event) => {
                  setSalaryLocation(event.target.value);
                }}
              />
            </Grid>
            <br />
            <Grid
              style={{
                height: "80px",
                position: "relative",
                left: "400px",
                top: "80px",
              }}
            >
              <SearchButton type="submit" variant="contained">
                Post
              </SearchButton>
            </Grid>
          </form>
        </div>
      </Modal>
    </div>
  );
}
