import {
  COMPANY_LIST_SUCCESS,
  COMPANY_LIST_FAIL,
  COMPANY_LIST_REVIEWS_SUCCESS,
  COMPANY_LIST_REVIEWS_FAIL,
  UPDATE_REVIEW_STATUS_SUCCESS,
  UPDATE_REVIEW_STATUS_FAIL,
  UPDATE_HELPFUL_COUNT_SUCCESS,
  UPDATE_HELPFUL_COUNT_FAIL,
  COMPANY_LIST_FEATURE_REVIEWS_SUCCESS,
  COMPANY_LIST_FEATURE_REVIEWS_FAIL,
} from "../Constants/Company";

import Axios from "axios";
import { API } from "../../config";

export const getcompaniesDetails = (data) => (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };
  Axios.get(
    `${API}/company/home`,
    {
      params: data,
    },
    config
  )
    .then((response) => {
      dispatch({
        type: COMPANY_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: COMPANY_LIST_FAIL,
        payload: error,
      });
    });
};

export const getCompanySpecificReviews = (data) => (dispatch) => {
  console.log(data);
  const config = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };
  Axios.get(
    `${API}/company/company-specific-reviews`,
    {
      params: data,
    },
    config
  )
    .then((response) => {
      dispatch({
        type: COMPANY_LIST_REVIEWS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: COMPANY_LIST_REVIEWS_FAIL,
        payload: error,
      });
    });
};

export const updateReviewStatus = (data) => (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  }; 
  Axios.put(
    `${API}/company/review/update-review-status?reviewid=${data.reviewid}&employerId=${data.employerId}`,
    data
  )
    .then((response) => {
      dispatch({
        type: UPDATE_REVIEW_STATUS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_REVIEW_STATUS_FAIL,
        payload: error,
      });
    });
};

export const updateHelpfulCount = (data) => (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };
  Axios.put(
    `${API}/company/review/update-helpful-count?reviewid=${data.reviewid}&helpfulcount=${data.helpfulcount}&nothelpfulcount=${data.nothelpfulcount}&employerId=${data.employerId}`,
    data
  )
    .then((response) => {
      dispatch({
        type: UPDATE_REVIEW_STATUS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_REVIEW_STATUS_FAIL,
        payload: error,
      });
    });
};

export const getFeaturedReviews = (data) => (dispatch) => {

  console.log(data);
  const config = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };
  Axios.get(
    `${API}/company/company-specific-featured-reviews?employerId=${data.employerId}`,
    config
  )
    .then((response) => {
      dispatch({
        type: COMPANY_LIST_FEATURE_REVIEWS_SUCCESS,
        payload: response.data,
    });
})
.catch((error) => {
  dispatch({
    type: COMPANY_LIST_FEATURE_REVIEWS_FAIL,
    payload: error,
  });
});
};

export const useremployerAllJob = (employerID, page, limit) => (dispatch) => {
  // const { employerID } = JSON.parse(localStorage.getItem("user"));
  console.log(page, limit);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // const newdata = { ...data, employerID: "61a07e89e5d016c47d56338a" };
  console.log("data", employerID);

  let url = `${API}/company/jobs?employerID=${employerID}`;
  if (page && limit) {
    url = url + `&page=${page}&limit=${limit}`;
    console.log(url);
  }

  Axios.get(url, config)
    .then((response) => {
      dispatch({
        type: "USER_EMPLOYER_ALL_JOBS",
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: "USER_EMPLOYER_ALL_JOBS_ERROR",
        payload: error,
      });
    });
};
