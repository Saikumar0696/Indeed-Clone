# Design and Implementation of Indeed Web Application Clone by using concepts of Distributed Enterprise Systems

<p align="center">
  <img src="https://github.com/Priyanka-NAM/Indeed/blob/develop/frontend/public/Images/Indeed_logo.png"/>
</p>


[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)


To gain a better understanding of the inner workings, tools and technologies used to develop a distributed full-stack application/product.

## What it does
We have implemented various features present in the original web application like
1) The JobSeeker, Employer cand signup and login to the system.
2) The Employer can post jobs and its details into the application and allowing job seekers to apply for the available jobs.
3) The JobSeeker can search for jobs based on the various factors like location, salary and can apply to them.
4) The JobSeeker can upload his resume and CV to his profile, moreover, a job seeker can also add reviews, comments on Company's page.
5) The Employer can add images of their work location and can also view job seeker's profile, resume and cv.
6) The Employer can update the application status of the Job Application.
7) The Employer can send messages to job seekers who applied to the jobs posted by the employer.
8) The JobSeeker can reply to the messages sent by the employer.
9) The Admin can review the comments posted by the job seekers, and can approve or reject the comments.
10) The Admin can review the images uploaded by the employers, and can approve or reject them.
11) The Employer can view the report which contains details of number of applicants, number of jobs etc within a year. 
12) The Admin can look into various analytics related to jobs and applications etc

## How it was built
1) Designed 3-tier distributed/scalable web application using message queues, caching, and connection pooling to improve throughput by approximately 70% as opposed to traditional backend implementations.
2) Implemented the Frontend in ReactJS and Redux  
3) Used React Testing Library to write frontend tests and Mocha to write backend tests to see if system functions as expected.
4) Deployed the application on AWS EC2 instances to leverage easy scalability the cloud platform has to offer. 
5) Organized the development lifecycle to mimic real world version control and agile methodologies.

## Features

## Tools used 
 ReactJS, NodeJS, ExpressJS, Mongo DB, MySQL, HTML5, PassportJS, Apache Kafka, Redis Caching

## Prerequisites
Before running this locally you must have Node,Apache Kafka (version 2.11),Zookeeper,Redis, MySQL,MongoDB etc.setup.

## Challenges we ran into
Tricky to implement Kafka for such a large scale application. Multiple zookepers would be needed to ensure smooth functioning.
Integration of various modules led to various merge conflicts.
A larger cloud instance (more then t2. micro capacity) would be needed to ensure a decent reponse time from system.

## Future Scope
Multiple image upload functionality while creating post
More granularity in Search jobs functionality.

## ✨ Contributors
<a href="https://github.com/Priyanka-NAM/Indeed/graphs/contributors">
  <img src="https://github.com/Priyanka-NAM/Indeed/blob/develop/uploads/Contributors.jpg"/>
</a>  


