const multer = require("multer");
const path = require("path");

// Storage engine for image uploads
const storage = multer.diskStorage({
//   save in /upload/images relative to project root
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../upload/images"));
  },
    //   destination: path.join(__dirname, '../upload/images'),
  filename: (req, file, cb) => {
    // product_123456789.png
    const fileName = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  }
});

// Multer upload instance
const upload = multer({ storage });

module.exports = upload;
