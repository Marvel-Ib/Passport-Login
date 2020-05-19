const express = require("express");
const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.static(__dirname + "/public"));

app.listen(PORT, () => {
  console.log("listening");
});
