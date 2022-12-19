const kafka = require("../kafka/client");
exports.uploadPhoto = async (req, res) => {
  console.log("upload photo");
  kafka.make_request("upload_photo", req.body, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.updatePhotoStatus = async (req, res) => {
  console.log("upload photo status");

  kafka.make_request("upload_photo_status", req.query, (err, results) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      res.status(200).json(results);
    }
  });
};
