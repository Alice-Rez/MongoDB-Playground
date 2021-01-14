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

// we can limit size of file - imageSize is in bites

let uploads = multer({ storage: storage, limits: { fileSize: 1000000 } });

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
  req.check("fullName", "fullname").custom((value) => {
    return value.match(/^[A-Za-z ]+$/);
  });
  req.check("email", "email").isEmail();
  req.check("password", "password length").isLength({ min: 10 });
  req.check("uname", "uname").isAlphanumeric();

  let errors = req.validationErrors();

  let path;

  if (req.file.path) {
    path = "http://localhost:3500/" + req.file.path;
  } else {
    path = "";
  }

  if (errors) {
    res.send({ msg: errors });
  } else {
    console.log(req.body);
    let newUser = req.body;

    let addedUser = new UserModel({
      fullName: newUser.fullName,
      email: newUser.email,
      uname: newUser.uname,
      password: newUser.password,
      profileImage: path,
    });

    addedUser
      .save()
      .then((result) => res.send(result))
      .catch((err) => res.send(err));
  }
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
