let connection = require("./kafka/Connection");
const colors = require("colors");
const connectDB = require("../config/db");
connectDB();

const top_rated_companies = require("./services/AdminServices/getTopRatedCompaniesService");
const top_reviewed_companies = require("./services/AdminServices/getTopReviewedCompaniesService");
const get_all_companies = require("./services/AdminServices/getAllCompanies");
const top_accepted_rated_ceos = require("./services/AdminServices/getTopRatedCEOs");
const top_accepted_review_users = require("./services/AdminServices/getTopAcceptedReviewUsersService");
const post_salary = require("./services/CompanyServices/PostSalaryService");
const get_salary = require("./services/CompanyServices/GetSalaryService");
const post_review = require("./services/CompanyServices/PostReviewService");
const company_specific_review = require("./services/CompanyServices/CompanySpecificService");
const get_all_reviews = require("./services/CompanyServices/GetAllReviewService");
const company_review = require("./services/CompanyServices/CompanyReview");
const update_review = require("./services/CompanyServices/UpdateReviewService");
const update_helpful_count = require("./services/CompanyServices/UpdateHelpfulCountService");
const upload_photo = require("./services/CompanyServices/UploadPhotoService");
const upload_photo_status = require("./services/CompanyServices/UploadPhotoStatusService");
const user_review = require("./services/CompanyServices/UserReviewService");
const update_user_saved_jobs = require("./services/UserServices/updateUserSavedJobsService");
const apply_job = require('./services/UserServices/applyJobService')
const update_employer = require("./services/EmployerServices/updateEmployerService");
const get_employer_details = require("./services/EmployerServices/getEmployerDetailsService");
const upload_employer_pics = require("./services/EmployerServices/companyPicsUploadService");
const employer_review_update = require("./services/EmployerServices/updateEmployerReview");
const delete_user_saved_jobs = require("./services/UserServices/deleteUserSavedJobs");
const get_user_saved_jobs = require("./services/UserServices/getUserSavedJobs");
const get_user_applied_jobs = require("./services/UserServices/getUserAppliedJobs");
const get_user_reviews = require("./services/UserServices/getUserReviews");
const get_user_profile = require("./services/UserServices/getUserProfile");
const update_user_profile = require("./services/UserServices/updateUserProfile");
const fetch_all_jobs = require("./services/UserServices/fetchAllJobs");
const create_job = require('./services/EmployerServices/createJobService');
const get_all_jobs = require('./services/EmployerServices/getAllJobsService');
const get_job_applicants = require('./services/EmployerServices/getJobApplicantsService');
const update_job_application = require('./services/EmployerServices/updateJobApplicationService');
const send_message = require('./services/MessagesServices/sendMessage')
const reply_message = require('./services/MessagesServices/replyMessage')
const get_message = require('./services/MessagesServices/getMessage')
const get_distinct_employer = require('./services/MessagesServices/getDistinctEmployer')

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  let consumer = connection.getConsumer(topic_name);
  let producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    let data = JSON.parse(message.value);

    fname.handle_request(data.data, function (err, res) {
      console.log("after handle" + res);
      let payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
        if (err) {
          console.log(err);
        }
        console.log(data);
      });
      return;
    });
  });
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("top_rated_companies", top_rated_companies);
handleTopicRequest("top_reviewed_companies", top_reviewed_companies);
handleTopicRequest("get_all_companies", get_all_companies);
handleTopicRequest("top_accepted_rated_ceos", top_accepted_rated_ceos);
handleTopicRequest("top_accepted_review_users", top_accepted_review_users);
handleTopicRequest("post_salary", post_salary);
handleTopicRequest("get_salary", get_salary);
handleTopicRequest("post_review", post_review);
handleTopicRequest("company_specific_review", company_specific_review);
handleTopicRequest("get_all_reviews", get_all_reviews);
handleTopicRequest("company_review", company_review);
handleTopicRequest("update_review", update_review);
handleTopicRequest("update_helpful_count", update_helpful_count);
handleTopicRequest("upload_photo", upload_photo);
handleTopicRequest("upload_photo_status", upload_photo_status);
handleTopicRequest("user_review", user_review);
handleTopicRequest("update_user_saved_jobs", update_user_saved_jobs);
handleTopicRequest("apply_job", apply_job)
handleTopicRequest("update_employer", update_employer);
handleTopicRequest("get_employer_details", get_employer_details);
handleTopicRequest("upload_employer_pics", upload_employer_pics);
handleTopicRequest("employer_review_update", employer_review_update);
handleTopicRequest("delete_user_saved_jobs", delete_user_saved_jobs);
handleTopicRequest("get_user_saved_jobs", get_user_saved_jobs);
handleTopicRequest("get_user_applied_jobs", get_user_applied_jobs);
handleTopicRequest("get_user_reviews", get_user_reviews);
handleTopicRequest("get_user_profile", get_user_profile);
handleTopicRequest("update_user_profile", update_user_profile);
handleTopicRequest("fetch_all_jobs", fetch_all_jobs);
handleTopicRequest('create_job', create_job)
handleTopicRequest('get_all_jobs', get_all_jobs)
handleTopicRequest('get_job_applicants', get_job_applicants)
handleTopicRequest('update_job_application', update_job_application)
handleTopicRequest('send_message', send_message)
handleTopicRequest('reply_message', reply_message)
handleTopicRequest('get_message', get_message)
handleTopicRequest('get_distinct_employer', get_distinct_employer)