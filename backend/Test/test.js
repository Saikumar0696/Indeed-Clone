/* eslint-disable no-undef */
const chai = require("chai");
chai.use(require("chai-http"));
const { expect } = require("chai");
const app = require("../server");

const agent = chai.request.agent(app);

describe("Login Functionality Testing", () => {
  it("Email is Required", (done) => {
    agent
      .post("/indeed/users/public/login")
      .send({ email: "", password: "123456" })
      .then((res) => {
        console.log("res.body", res.text);
        expect(res.text).equal("email is required");
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  });
  it("Password is Required", (done) => {
    agent
      .post("/indeed/users/public/login")
      .send({ email: "test9@gmail.com", password: "" })
      .then((res) => {
        console.log("res.body", res.text);
        expect(res.text).equal("password is required");
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  });
  it("Job Seeker Login UnSucessfull", (done) => {
    agent
      .post("/indeed/users/public/login")
      .send({ email: "test9@gmail.com", password: "165" })
      .then((res) => {
        expect(res.text).equal("Unauthorized");
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  });
  it("Employer Login Sucessfull", (done) => {
    agent
      .post("/indeed/users/public/login")
      .send({ email: "123z@gmail.com", password: "123456" })
      .then((res) => {
        expect(res.body).to.have.property("email", "123z@gmail.com");
        expect(res.body).to.have.property("role", 1);
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  }).timeout(4000);

  it("Job Seeker SignUp", (done) => {
    agent
      .post("/indeed/users/public/signup")
      // CHANGE EMAIL ID FOR EVERY RUN
      .send({ email: "742@gmail.com", password: "742", role: 0 })
      .then((res) => {
        console.log("res.body", res.text);
        expect(res.body).to.have.property("role", 0);
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  });
});

describe("Employer Functionality", () => {
  it(" Employer Post Jobs - Job Post Sucessfull", (done) => {
    agent
      .post("/indeed/employer/post-job")
      .send({
        jobTitle: "Engineer",
        employerID: "61a85f42397f6d36470922ab",
        companyName: "Hp",
        industry: "Software",
        jobLocation: {
          address: "235 Bernado Avenue",
          city: "SanJose",
          state: "CA",
          country: "USA",
          zipcode: "94050",
        },
        jobType: "Software",
        isRemote: "0",
        salary: "120000",
        jobDescription: {
          compensation: "150000",
          requirement: "it is for test",
          moreInfo: "It is test",
          responsibilites:
            "Includes but is not limited to the following. Other duties may be assigned",
        },
      })
      .then((res) => {
        expect(res.body).to.have.property(
          "employerID",
          "61a85f42397f6d36470922ab"
        );
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  });
});

describe(" Job Seeker Functionality Testing", () => {
  it("Get Company Specific Reviews", (done) => {
    agent
      .get(
        "/indeed/company/company-specific-reviews?employerId=619f0cdd8188bc6c174294cf"
      )
      .then((res) => {
        expect(res.body.map((e) => e.employerId)).to.include(
          "619f0cdd8188bc6c174294cf"
        );
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  }).timeout(4000);

  it(" Apply Jobs", (done) => {
    agent
      .post("/indeed/users/apply-job")
      .send({
        userId: "61a8e7e59c6ac29ed713a581",
        jobId: "61a903761f983d599cf51879",
        employerId: "61a85f42397f6d36470922ab",
      })
      .then((res) => {
        expect(res.text).equal("job already applied");
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  });

  it(" Post Saved Jobs", (done) => {
    agent
      .post("/indeed/users/saved-jobs")
      .send({
        userId: "61a8e7e59c6ac29ed713a581",
        jobId: "61a903761f983d599cf51879",
      })
      .then((res) => {
        expect(res.text).equal("Job already added to saved jobs");
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  });
});

describe("Admin Functionality Testing", () => {
  it("Get Top rated Companies", (done) => {
    agent
      .get("/indeed/admin/get-top-ratedcomapnies")
      .then((res) => {
        expect(res.body).to.have.length.above(0);
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  }).timeout(4000);
  it("Get Top rated Ceos", (done) => {
    agent
      .get("/indeed/admin/get-top-rated-ceos")
      .then((res) => {
        expect(res.body).to.have.lengthOf(10);
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  }).timeout(4000);
  it("Five Job Seekers based on total accepted reviews", (done) => {
    agent
      .get("/indeed/admin/get-top-acceptedreview-users")
      .then((res) => {
        expect(res.body).to.have.lengthOf(5);
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  }).timeout(4000);
});
