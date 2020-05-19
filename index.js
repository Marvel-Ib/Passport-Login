const express = require("express");
const app = express();
const PORT = 5000 || process.env.PORT;
const expressLayouts = require("express-ejs-layouts");

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("Login");
});

app.get("/contact", (req, res) => {
  res.render("Contact");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(PORT, () => {
  console.log("listening");
});
