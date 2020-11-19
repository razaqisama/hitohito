const express = require("express");
const app = express();
const port = 3000;
const router = require("./routers/index");
const session = require("express-session");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secretBanget",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static("public"));
app.use("/", router);

app.listen(port, () => {
  console.log("Listening on port:", port);
  
});