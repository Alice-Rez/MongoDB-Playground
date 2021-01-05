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
  let addedUser = new UserModel(newUser);

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

router.put("/update", (req, res, next) => {
  console.log(req.body);
  let { userID, password, newPassword } = req.body;
  UserModel.updateOne(
    { email: userID, password: password },
    { password: newPassword }
  )
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

module.exports = router;
