const mysql = require("mysql");
const moment = require("moment");
const multer = require("multer");

const newVacancy = (req, res) => {
  try {
    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "yunxi",
    });
    connection.connect();
    console.log("connected");
    res.send({
      status: 200,
      message: "connected",
    });

    const d = moment(Date.now()).format("YYYY-MM-DD");
    // const d = "2024-10-16";
    console.log(d);

    connection.query(
      `INSERT INTO vacancy_notices VALUES('','MARKETING OFFICER',${d},'text')`
    );
    connection.end();
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: "failed to connect to server",
    });
  }
};

module.exports = {
  newVacancy,
};
