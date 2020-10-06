var express = require("express");
const { listIndexes } = require("../models/contactModel");
var router = express.Router();
var User = require("../models/contactModel");
var List = require("../models/listModel");

router.get("/", function (req, res) {
  res.send(`hello world!`);
  res.render("index", { name: "김승빈" });
});

router.post("/signup", function (req, res, next) {
  // console.log(req.body);
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      return next(err);
    } else if (user) {
      return res.send("email is already exist!!");
    } else {
      var contact = new User();
      contact.name = req.body.name;
      contact.password = req.body.password;
      contact.email = req.body.email;
      contact.gender = req.body.gender;
      contact.phone = req.body.phone;

      contact.save(function (err) {
        if (err) {
          res.json(err);
        } else {
          res.json({ message: "new contact create data", data: contact });
        }
      });
    }
  });
  /* req.body에서 .name 을 하면 이름을, .phone을 하면 폰 번호를 불러온다. req.body로만 되어있으면 body에 있는 값 전부를 받아온다.*/
});

router.post("/login", function (req, res, next) {
  var email = req.body.id;
  var password = req.body.password;
  /*findOne에서 첫번째 email은 스키마의 email, 두번째 email은 router.post("/login")에서 명해준 var email의 email */
  User.findOne({ email: email }, function (err, user) {
    if (err) return next(err);
    else if (!user) return res.send("user not founded");
    else {
      if (user.password != password) {
        res.send("password is invalid");
      } else {
        console.log(user);
        res.send(`welcome to my world! ${user.name}!!!!`);
      }
    }
  });
});

router.get("/list", function (req, res, next) {
  res.render("input");
});

router.post("/list", (req, res, next) => {
  // console.log(req.body.author);
  // res.send("success");
  // var board = new List();
  var board = new List();
  board.title = req.body.title;
  board.contents = req.body.contents;
  board.author = req.body.author;

  board.save(function (err) {
    if (err) {
      return next(err);
    } else {
      return res.json("save success!!");
    }
  });
  console.log(req.body);
});

router.get("/contents", (req, res, next) => {
  List.find((err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
});
module.exports = router;
