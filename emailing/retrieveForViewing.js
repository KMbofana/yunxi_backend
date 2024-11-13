const fs = require("fs");
const path = require("path");

const folderPath = "imageUploads";

const imageExtensions = [".jpg", ".png", ".jpeg"];

const retrieveImagesForViewing = (req, res) => {
  try {
    let images = [];
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.log(err);
        console.log("in error");
      } else {
        files.forEach((file) => {
          const filePath = path.join(folderPath, file);
          const fileExtension = path.extname(file);

          if (imageExtensions.includes(fileExtension)) {
            images.push(file);
            console.log(`Image found: ${folderPath + "/" + file}`);
          }
        });
        res.send({
          status: 200,
          message: "reached",
          data: images,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: "server error",
    });
  }
};

const getContentType = (fileName) => {
  const extensions = {
    jpg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
  };
  const extension = path.extname(fileName).slice(1);
  return extensions[extension] || "application/octet-stream";
};

const serveImagesFromFolder = (req, res) => {
  console.log("reached");
  console.log(req.query.imageName);
  const imageName = req.query.imageName;
  const imageFolder = "imageUploads";
  const correctedRootPath = __dirname.substring(0, __dirname.length - 9);
  const imagePath = path.join(correctedRootPath, imageFolder, imageName);
  console.log(imagePath);

  fs.readFile(imagePath, (err, data) => {
    if (err) {
      res.status(404).send("Image not found");
    } else {
      res.set("Content-Type", getContentType(imageName));
      res.send(data);
    }
  });
};

module.exports = {
  retrieveImagesForViewing,
  serveImagesFromFolder,
};
