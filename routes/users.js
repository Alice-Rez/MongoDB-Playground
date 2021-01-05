var express = require("express");
const UserModel = require("../model/UserModel");
var router = express.Router();

/* GET users listing. */
router.get("/all", function (req, res, next) {
  UserModel.find()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

router.post("/find", (req, res, next) => {
  let { email } = req.body;
  console.log(email);
  UserModel.find({ email: email })
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

router.post("/register", (req, res, next) => {
  console.log(req.body);
  let newUser = req.body;
  let addedUser = new UserModel({
    fullName: newUser.fullName,
    email: newUser.email,
    uname: newUser.uname,
    password: newUser.password,
  });

  addedUser
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

router.post("/login", (req, res, next) => {
  // console.log(req.body);
  // let loginData = req.body;
  // MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
  //   if (err) throw err;
  //   let myDB = db.db("sample_training");
  //   myDB
  //     .collection("users")
  //     .findOne(
  //       { email: loginData.email, password: loginData.password },
  //       (err, result) => {
  //         if (err) throw err;
  //         if (result !== null) {
  //           res.send({
  //             logged: true,
  //             uname: result.uname,
  //             email: result.email,
  //           });
  //         } else {
  //           res.send({ logged: false });
  //         }
  //         db.close();
  //       }
  //     );
  // });
});

router.put("/update", (req, res, next) => {
  // console.log(req.body);
  // let { userID, password, newPassword } = req.body;
  // MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
  //   if (err) throw err;
  //   let myDB = db.db("sample_training");
  //   myDB
  //     .collection("users")
  //     .updateOne(
  //       { email: userID, password: password },
  //       { $set: { password: newPassword } },
  //       (err, result) => {
  //         if (err) throw err;
  //         res.send(result);
  //         db.close();
  //       }
  //     );
  // });
});

module.exports = router;
