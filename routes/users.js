var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb+srv://fahim:fahim@cluster0.zhe8p.mongodb.net/?retryWrites=true&w=majority";

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  let newUser = req.body;
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    let myDB = db.db("sample_training");
    myDB.collection("users").insertOne(newUser, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("new user added to database");
      db.close();
    });
  });
});

router.post("/login", (req, res, next) => {
  console.log(req.body);
  let loginData = req.body;
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    let myDB = db.db("sample_training");
    myDB
      .collection("users")
      .findOne(
        { email: loginData.email, password: loginData.password },
        (err, result) => {
          if (err) throw err;
          if (result !== null) {
            res.send({
              logged: true,
              uname: result.uname,
              email: result.email,
            });
          } else {
            res.send({ logged: false });
          }
          db.close();
        }
      );
  });
});

router.post("/update", (req, res, next) => {
  console.log(req.body);
  let { userID, password, newPassword } = req.body;
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    let myDB = db.db("sample_training");
    myDB
      .collection("users")
      .updateOne(
        { email: userID, password: password },
        { $set: { password: newPassword } },
        (err, result) => {
          if (err) throw err;
          res.send(result);
          db.close();
        }
      );
  });
});

module.exports = router;
