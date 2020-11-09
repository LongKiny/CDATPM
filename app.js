const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const multer = require("multer");
const { getHome, postHome } = require("./model/home");
const helpers = require("./helpers/helpers");
const upload = multer({ dest: "uploads/", fileFilter: helpers.imageFilter });

const app = express();
const port = 3000;

app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.route("/").get(getHome).post(upload.single("fileEncrypt"), postHome);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
