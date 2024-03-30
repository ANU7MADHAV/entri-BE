const Aws = require("aws-sdk");
const dotenv = require("dotenv");
const multer = require("multer");
const multerS3 = require("multer-s3");

dotenv.config();

Aws.config.update({
  accessKeyId: process.env.ACESS_KEY,
  secretAccessKey: process.env.SECRET_ACESS_KEY,
  region: process.env.REGION,
});

const s3 = new Aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "entriimages",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;
