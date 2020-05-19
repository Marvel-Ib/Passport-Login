const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");

router.get("/login", (req, res) => {
  res.render("Login", { act: "login", ers: null });
});

router.get("/fail", (req, res) => {
  res.render("Login", { act: "login", ers: true });
});
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/auth/fail" }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/signup", (req, res) => {
  res.render("signup", { act: "cool", ers: null });
});

router.post("/signup", (req, res) => {
  User.findOne({ name: req.body.username }).then(async (currentUser) => {
    if (currentUser) {
      res.render("signup", { act: "true", ers: true });
    } else {
      const he = new User({
        name: req.body.username,
        password: req.body.password,
      });
      re = await he.save();
      res.render("login", { act: "login", ers: null });
    }
  });
});

router.get("/logout", (req, res) => {
  req.logout(); // passport provides it jare
  res.redirect("/");
});

module.exports = router;
