//jshint esversion:6
require('dotenv').config(); //very essential for security purpose,
//don't expose your api key, encryption, passcode publicily
//instead use environment variables.
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
// const encrypt = require('mongoose-encryption');
// const md5 = require('md5');
const bcrypt = require('bcrypt');
const saltRounds = 10; //increasing saltRounds can require more computation to generate hash
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const secret = process.env.SECRET;
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
//encryption should done before creating mongoose model
// userSchema.plugin(encrypt, {
//   secret: secret,
//   encryptedFields: ['password']
// });
const User = mongoose.model("user", userSchema);

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const username = req.body.username;
    const newUser = User({
      username: username,
      password: hash
    });
    newUser.save();
    res.render("secrets");
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({
    username: username
  }, (err, fountItem) => {
    if (fountItem) {
      bcrypt.compare(password, fountItem.password, function(err, result) {
        if (result == true)
          res.render("secrets");
        else
          res.send("<h1>No matching username or password</h1>");
      });

    } else {
      res.send("<h1>No matching username or password</h1>");
    }
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
