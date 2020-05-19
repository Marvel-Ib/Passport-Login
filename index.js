const express = require("express");
const app = express();
const PORT = 5000 || process.env.PORT;
const passport = require("passport");
let cookieSession = require("cookie-session");
const expressLayouts = require("express-ejs-layouts");
const authRoute = require("./routes/auth");
const readRoute = require("./routes/read");
//dotenv
require("dotenv").config();
//Layout views etc
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

//passsport config
require("./passport/pass");

//passport shit
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.KEY1, process.env.KEY2],
  })
);
app.use(passport.initialize());
app.use(passport.session());

//database
require("./models/connect");

app.get("/", (req, res) => {
  res.render("home", { act: "home" });
});
app.use(readRoute);
app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.log("listening");
});
