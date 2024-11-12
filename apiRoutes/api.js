const express = require("express");
const route = express.Router();

const multer = require("multer");
const helpers = require("./helper");

const emailing = require("../emailing/emailing");
const newVacancy = require("../vacancyPost/vacancyPost");
const recordNewsLetters = require("../emailing/newsletters");
const storeInLocal = require("../emailing/gallery");
const retrieveForViewing = require("../emailing/retrieveForViewing");
const authentication = require("../emailing/authentication");

const mysql = require("mysql");
const moment = require("moment");

const path = require("path");

route.get("/", function (req, res) {
  res.send({
    status: 200,
    message: "Hello friend!",
  });
});

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
      const insertQuery = `INSERT INTO vacancy_notices VALUES(?,?,?,?)`;
      const insertParams = ["", req.body.job_title, d, req.file.path];
      connection.query(insertQuery, insertParams);
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

route.get("/api/record_emails", recordNewsLetters.recordEmails);

// Set up multer storage engine
const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./imageUploads"); // Upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // File name
  },
});

const upload = multer({ storage: storage2 });

route.post(
  "/api/upload_images",
  upload.array("photos"),
  storeInLocal.storeFile
);

route.get("/api/retrieve_images", retrieveForViewing.retrieveImagesForViewing);
route.get("/api/images/", retrieveForViewing.serveImagesFromFolder);

const upload2 = multer({ storage: storage2 });
route.post(
  "/api/send_to_all",
  upload2.array("fileDocument"),
  emailing.sendNewsLetterToAll
);

route.post("/api/register_account", authentication.register);
route.post("/api/login", authentication.login);

module.exports = route;
