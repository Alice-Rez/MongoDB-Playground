var express = require("express");
var router = express.Router();
let mongoose = require("mongoose");
let url =
  "mongodb+srv://admin:fahim@cluster0.zhe8p.mongodb.net/sample_training?retryWrites=true&w=majority";

router.get("/add", (req, res, next) => {
  mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

  let database = mongoose.connection;

  database.on("error", (err) => {
    console.log(err);
  });

  database.once("open", () => {
    console.log("connected succesfully");

    let projectSchema = new mongoose.Schema({
      name: String,
      contributors: [String],
      deadline: { type: Date, default: Date.now },
    });
  });

  res.send("connection made");
});

module.exports = router;
