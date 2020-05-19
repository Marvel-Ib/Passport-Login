const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("Login", { act: "login" });
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/login" }),
  (req, res) => {
    console.log(req.user);
    res.redirect("/");
  }
);

router.get("/signup", (req, res) => {
  res.render("signup", { act: "home" });
});

router.get("/logout", (req, res) => {
  res.send("lgout");
});

module.exports = router;
