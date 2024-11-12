const storeFile = (req, res, next) => {
  res.send({
    status: 200,
    message: "image uploaded",
  });
};

module.exports = {
  storeFile,
};
