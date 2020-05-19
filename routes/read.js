const express = require("express");
const router = express.Router();

router.get("/about", (req, res) => {
  res.render("about", { act: "about" });
});

router.get("/contact", (req, res) => {
  res.render("Contact", { act: "contact" });
});

module.exports = router;
