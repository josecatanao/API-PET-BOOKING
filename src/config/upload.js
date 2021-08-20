const multer = require("multer");
const {join} = require("path");

module.exports = {
  storage: multer.diskStorage({
    destination: join(__dirname, "..", "..", "uploads"),
    filename: (request, file, callback) => {
      const fileName = `${Date.now()}-${file.originalname.trim()}`;
      callback(null, fileName);
    }
  })
}