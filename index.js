const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const apiRoutes = require("./apiRoutes/api");
const multer = require("multer");

const app = express();
app.use(cors({ origin: "*" }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiRoutes);
app.use(multer);

app.use(express.static(__dirname + "/public"));

const server = http.createServer(app);

server.listen(3001, () => {
  console.log("Proxy server now running on port 3003 🤹‍♂️");
});
