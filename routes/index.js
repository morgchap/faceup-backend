var express = require("express");
var router = express.Router();
const uniqid = require("uniqid");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

router.post("/upload", async (req, res) => {
  const photoPath = `./tmp/${uniqid()}.jpg`;
  const resultMove = await req.files.photoFromFront.mv(photoPath);

  if (!resultMove) {
    const resultCloudinary = await cloudinary.uploader.upload(photoPath);

    fs.unlinkSync(photoPath);
    console.log(resultCloudinary.secure_url);
    res.json({ result: true, url: resultCloudinary.secure_url });
  } else {
    res.json({ result: false, error: resultCopy });
  }
});

module.exports = router;
