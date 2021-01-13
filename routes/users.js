var express = require("express");
const UserModel = require("../model/UserModel");
var router = express.Router();
let multer = require("multer");
const { v4: uuidv4 } = require("uuid");

let storage = multer.diskStorage({
  destination: "uploads/images/",
  filename: function (req, file, cb) {
    console.log("###########");
    console.log(req.body);
    cb(
      null,
      /*req.body.email.split("@")[0] + "-" + Date.now() + "." // +
      file.mimetype.split("/")[1] */
      uuidv4() + "." + file.mimetype.split("/")[1]
    );
  },
});

let uploads = multer({ storage: storage });

/* GET users listing. */
router.get("/all", function (req, res, next) {
  UserModel.find()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

router.get("/:id", function (req, res, next) {
  let user = req.params.id;
  UserModel.find({ email: user })
    .select("-password")
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

router.post("/register", uploads.single("file"), (req, res, next) => {
  console.log(req.body);
  let newUser = req.body;
  let addedUser = new UserModel({
    fullName: newUser.fullName,
    email: newUser.email,
    uname: newUser.uname,
    password: newUser.password,
    profileImage: "http://localhost:3500/" + req.file.path,
  });

  addedUser
    .save()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

router.post("/login", (req, res, next) => {
  console.log(req.body);
  let loginData = req.body;
  UserModel.find(loginData)
    .then((result) => {
      if (result.length) {
        console.log(result);
        res.send({
          logged: true,
          uname: result[0].uname,
          email: result[0].email,
        });
      } else {
        res.send({ logged: false });
      }
      console.log(result);
    })
    .catch((err) => res.send(err));
});

router.put("/updatePWD", (req, res, next) => {
  console.log(req.body);
  let { userID, password, newPassword } = req.body;
  UserModel.updateOne(
    { email: userID, password: password },
    { password: newPassword }
  )
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

router.put("/updatePhoto", uploads.single("file"), (req, res, next) => {
  console.log(req.body);
  let { userID } = req.body;
  UserModel.updateOne(
    { email: userID },
    { profileImage: "http://localhost:3500/" + req.file.path }
  )
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

module.exports = router;
