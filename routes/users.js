var express = require("express");
const UserModel = require("../model/UserModel");
var router = express.Router();

/* GET users listing. */
router.get("/all", function (req, res, next) {
  UserModel.find()
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
    .catch((err) => res.send(err));
});

router.post("/login", (req, res, next) => {
  console.log(req.body);
  let loginData = req.body;
  UserModel.find({ email: loginData.email, password: loginData.password })
    .then((result) => {
      if (result.length) {
        res.send({
          logged: true,
          uname: result.uname,
          email: result.email,
        });
      } else {
        res.send({ logged: false });
      }
      console.log(result);
    })
    .catch((err) => res.send(err));
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
