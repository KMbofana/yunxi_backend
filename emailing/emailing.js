const nodemailer = require("nodemailer");
// const connection = require("../mysqlconnection");
const path = require("path");

const newsLetter = (req, res) => {
  try {
    console.log("sending email...");
    console.log(req.body.email);
    const transporter = nodemailer.createTransport({
      // host: "smtp.yunxiagriculture.org",
      host: "smtp.yunxiagriculture.org",
      port: 465,
      // secure: false, // upgrade later with STARTTLS
      secure: "STARTTLS", // upgrade later with STARTTLS
      tls: {
        minVersion: "TLSv1.2",
        rejectUnauthorized: false,
      },
      auth: {
        user: "info@yunxiagriculture.org",
        pass: "info@yunxi2025",
      },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // send mail with defined transport object
      // const conn = connection.connectToDB();
      // const insertQuery = `INSERT INTO news_letter_subscriptions VALUES(?,?,?,?)`;
      // const insertParams = ["", "test", req.body.email, true];
      // conn.query(insertQuery, insertParams, async (error, results, fields) => {
      //   if (error) {
      //     console.log(error);
      //     res.send({
      //       status: 500,
      //       message: "email could not be sent",
      //     });
      //   } else {
      //     const info = await transporter.sendMail({
      //       from: req.body.email, // sender address
      //       to: "info@yunxiagriculture.org", // list of receivers
      //       subject: "SUBSCRIPTION FOR NEWS", // Subject line
      //       text: "Would like to hear more from your organization", // plain text body
      //     });
      //     console.log("Message sent: %s", info.messageId);
      //     console.log(results);
      //     res.send({
      //       status: 200,
      //       message: "email sent",
      //     });
      //   }
      // });

      const info = await transporter.sendMail({
        from: req.body.email, // sender address
        to: "info@yunxiagriculture.org", // list of receivers
        subject: "SUBSCRIPTION FOR NEWS", // Subject line
        text: "Would like to hear more from your organization", // plain text body
      });
      console.log("Message sent: %s", info.messageId);

      res.send({
        status: 200,
        message: "email sent",
      });
    }

    main().catch((err) => {
      console.error;
      res.send({
        status: 500,
        message: "failed to send email",
      });
    });
  } catch (error) {
    res.send(error.message);
  }
};

const contactUs = (req, res) => {
  try {
    console.log("sending email...");
    console.log(req.body.email);
    const transporter = nodemailer.createTransport({
      // host: "smtp.yunxiagriculture.org",
      host: "smtp.yunxiagriculture.org",
      port: 465,
      // secure: false, // upgrade later with STARTTLS
      secure: "STARTTLS", // upgrade later with STARTTLS
      tls: {
        minVersion: "TLSv1.2",
        rejectUnauthorized: false,
      },
      auth: {
        user: "info@yunxiagriculture.org",
        pass: "info@yunxi2025",
      },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: req.body.email, // sender address
        to: "info@yunxiagriculture.org", // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.message, // plain text body
      });
      console.log("Message sent: %s", info.messageId);
      res.send({
        status: 200,
        message: "email sent",
      });
    }

    main().catch((error) => {
      res.send({
        status: 500,
        message: "failed to send email",
        error: error,
      });
    });
  } catch (error) {
    res.send(error.message);
  }
};

const sendNewsLetterToAll = (req, res) => {
  console.log(req.files[0].originalname);
  const correctedRootPath = __dirname.substring(0, __dirname.length - 9);
  const imageFolder = "imageUploads";
  const filepath = path.join(
    correctedRootPath,
    imageFolder,
    req.files[0].originalname
  );
  const transporter = nodemailer.createTransport({
    // host: "smtp.yunxiagriculture.org",
    host: "smtp.yunxiagriculture.org",
    port: 465,
    // secure: false, // upgrade later with STARTTLS
    secure: "STARTTLS", // upgrade later with STARTTLS
    tls: {
      minVersion: "TLSv1.2",
      rejectUnauthorized: false,
    },
    auth: {
      user: "info@yunxiagriculture.org",
      pass: "info@yunxi2025",
    },
  });

  try {
    async function main() {
      await transporter.sendMail({
        from: "info@yunxiagriculture.org", // sender address
        to: req.body.receivers, // list of receivers
        subject: req.body.newsTitle, // Subject line
        html: req.body.newsLetter, // html body
        attachments: [{ filename: req.files.filename, path: filepath }],
      });
      res.send({
        status: 200,
        message: "Newsletter sent successfully",
      });
    }

    main().catch((err) => {
      console.error(err);
      res.send({
        status: 500,
        message: "failed to send email",
      });
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = {
  newsLetter,
  contactUs,
  sendNewsLetterToAll,
};
