const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();
const port = 3000;

app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app
  .route("/")
  .get((req, res) => {
    res.render("encode");
  })
  .post(upload.single("fileEncode"), (req, res) => {
    console.log(req.file);
    res.json("ok");
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
