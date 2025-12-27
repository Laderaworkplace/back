import multer from "multer";
import path from "path";
import fs from "fs"

const uploadFolder = path.join(process.cwd(), "uploads");

// Create folder if it doesn't exist
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder); // use the ensured folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name); // unique filename
  },
});

// Create upload middleware
const upload = multer({ storage });

export default upload;
