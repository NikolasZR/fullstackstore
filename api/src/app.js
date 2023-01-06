const express = require("express");
const engine = require("ejs-mate");
const morgan = require("morgan");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
const routes = require("./routes/index.routes");
const userRoutes = require("../src/routes/users");

// initializations
const app = express();
require("../database");
require("./passport/local-auth");

// settings
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.use(express.json());

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "mysecretsession",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(routes);
app.use("/api", userRoutes);

module.exports = app;
