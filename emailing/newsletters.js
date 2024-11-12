const connection = require("../mysqlconnection");

const recordEmails = (req, res) => {
  const conn = connection.connectToDB();

  conn.query(
    "SELECT * FROM news_letter_subscriptions",
    (error, results, field) => {
      if (error) {
        console.log(error);
        res.send({
          status: 500,
          message: "could not connect to database",
        });
      } else {
        console.log(results);
        res.send({
          status: 200,
          message: "emails retrieved",
          data: results,
        });
      }
    }
  );
};

const sendNewsLetterToAll = (req, res) => {
  console.log(req.body.newsLetter);
  console.log(req.body.newsTitle);
  console.log(req.body.receivers);
  console.log(req.body.file);

  res.send({
    newsLetter: req.body.newsLetter,
    newsTitle: req.body.newsTitle,
    receivers: req.body.receivers,
    file: req.body.file,
  });
};

module.exports = {
  recordEmails,
  sendNewsLetterToAll,
};
