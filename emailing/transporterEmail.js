const nodemailer = require("nodemailer");

export default transporter = nodemailer.createTransport({
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
