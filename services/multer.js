const multer = require("multer");
const path = require('path')
const storageEngine = multer.diskStorage({
    destination: "./images",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}--${file.originalname}`);
    },
  });
  
  const checkFileType = function (file, cb) {
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/;
  
    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  
    const mimeType = fileTypes.test(file.mimetype);
  
    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb("Error: You can Only Upload Images!!");
    }
  };
  const upload = multer({
    storage: storageEngine,
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    },
  });
  module.exports = upload;

// const multer = require('multer');

// const createUploadMiddleware = (folderName) => {
//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       // Specify the directory where the file will be saved
//       cb(null, folderName);
//     },
//     filename: function (req, file, cb) {
//       // Specify the filename of the uploaded file
//       cb(null, Date.now() + file.originalname);
//     }
//   });

//   // Return the multer middleware directly
//   return multer({ storage: storage });
// };

// module.exports = createUploadMiddleware;