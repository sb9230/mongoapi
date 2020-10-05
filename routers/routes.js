var express = require("express");
var router = express.Router();
var User = require("../models/contactModel");

router.get("/", function (req, res) {
  //   res.send("hello world!");
  res.render("index", { name: "김승빈" });
});

router.post("/signup", function (req, res) {
  console.log(req.body[1].name);
  res.send("Success");
});
module.exports = router;
