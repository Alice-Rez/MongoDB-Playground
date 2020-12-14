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
      res.send("new user added to database");
      db.close();
    });
  });
});

module.exports = router;
