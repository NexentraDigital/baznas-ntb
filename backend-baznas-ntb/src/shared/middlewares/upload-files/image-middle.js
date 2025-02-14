import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagePath = path.join(__dirname, "../../../../public/uploads/");

/**
 *
 * @scoop {gelobal}
 * @description fungsi middleware untuk upload files
 * @return {object} data
 *
 */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(imagePath)) {
      fs.mkdirSync(imagePath, { recursive: true });
    }
    cb(null, imagePath);
  },
  filename: function (req, file, cb) {
    const title = req.body.title;
    const sanitizedTitle = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const fileName = sanitizedTitle + "-" + Date.now();
    const ext = path.extname(file.originalname);
    cb(null, fileName + ext);
  },
});

const filterTypeFile = (req, file, cb) => {
  const mimetype = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/svg+xml",
    "image/gif",
    "image/webp",
  ];
  if (mimetype.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Image hanya boleh jpg,png,svg,wepg"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: filterTypeFile,
  limits: { fileSize: 2 * 1024 * 1024 },
});

export const uploadNone = upload.none();
export const uploadFields = (fields) => upload.fields(fields);
export const uploadSingle = (fieldName) => upload.single(fieldName);
export const uploadArray = (fieldName, maxCount) =>
  upload.array(fieldName, maxCount);
