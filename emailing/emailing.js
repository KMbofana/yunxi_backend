const nodemailer = require("nodemailer");

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

module.exports = {
  newsLetter,
  contactUs,
};
