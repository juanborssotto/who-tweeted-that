const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const { homeController, loginController, gameController } = require("./controllers");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  session({
    secret: "very secret",
    resave: false,
    saveUninitialized: true
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", homeController);
app.use("/login", loginController);
app.use("/game", gameController);

module.exports = app;
