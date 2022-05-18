const router = require("express").Router();
const Signup = require("../models/Signup");
const Friend = require("../models/Friend");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signupvalidate } = require("../validation");
const { loginvalidate } = require("../validation");
const verification = require("./verification");

router.get("/findfriend", verification, async (req, res) => {
  try {
    const frined = await Friend.find({ id: req.user._id });
    res.send(frined);
  } catch (err) {
    res.send(err);
  }
});
router.post("/friend", verification, async (req, res) => {
  const dost = new Friend({
    id: req.user._id,
    name: req.body.name,
    date: req.body.date,
  });
  try {
    const Dost = await dost.save();
    res.send(Dost);
  } catch (err) {
    res.send(err.details[0].message);
  }
});
router.post("/signup", async (req, res) => {
  try {
    const ver = signupvalidate(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(req.body.password, salt);
    const person = new Signup({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashpass,
    });
    const find = await Signup.findOne({ email: req.body.email });
    if (find) {
      return res.status(400).send("user already exists");
    }
    const user = await person.save();
    console.log("under user");
    res.send(user);
  } catch (err) {
    res.send(err.details[0].message);
  }
});
router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const val = await loginvalidate(req.body);
    const user = await Signup.findOne({ email: req.body.email });
    if (user) {
      const pass = await bcrypt.compare(req.body.password, user.password);
      if (pass) {
        const token = await jwt.sign(
          { _id: user._id },
          process.env.TOKEN_SECRET
        );
        res.header(token, "auth-token");
        res.send(token);
      } else {
        res.status(400).send("email or pass incorrect");
      }
    } else {
      res.status(400).send("email or pass incorrect");
    }
  } catch (err) {}
});

router.get("/", async (req, res) => {
  try {
    const user = await Signup.find();
    res.json(user);
  } catch (err) {
    res.send(err.details[0].message);
  }
});
module.exports = router;
