const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const uploadImage = (folderName, fieldName) => {
  const storagePath = path.join('public', folderName);

  if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, storagePath);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const uniqueName = `${uuidv4()}-${Date.now()}${ext}`;
      console.log(uniqueName,"uniqueName")
      cb(null, uniqueName);
    }
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  };


  return multer({ storage, fileFilter }).single(fieldName);
};

module.exports = { uploadImage };
