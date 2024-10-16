const express = require("express");
const route = express.Router();

const multer = require("multer");
const helpers = require("./helper");

const emailing = require("../emailing/emailing");
const newVacancy = require("../vacancyPost/vacancyPost");
const mysql = require("mysql");
const moment = require("moment");
const path = require("path");

route.post("/api/news_letter", emailing.newsLetter);
route.post("/api/contact_us", emailing.contactUs);
// route.get("/api/new_vacancy", newVacancy.newVacancy);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

route.post("/api/new_vacancy", (req, res) => {
  try {
    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "yunxi",
    });
    connection.connect();
    console.log("connected");

    const d = moment(Date.now()).format("YYYY-MM-DD");
    // const d = "2024-10-16";
    console.log(d);

    // 'vancypost' is the name of our file input field in the HTML form
    let upload = multer({
      storage: storage,
      fileFilter: helpers.imageFilter,
    }).single("vancypost");

    upload(req, res, function (err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields, if there were any

      console.log(req.body);

      if (req.fileValidationError) {
        return res.send(req.fileValidationError);
      } else if (!req.file) {
        return res.send("Please select an image to upload");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }

      connection.query(
        `INSERT INTO vacancy_notices VALUES('',${req.body.job_title},${d},${req.file.path})`
      );
      connection.end();

      // Display uploaded image for user validation
      res.send(
        `You have uploaded this file: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another document</a>`
      );
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: "failed to connect to server",
    });
  }
});

module.exports = route;
