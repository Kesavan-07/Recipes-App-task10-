const express = require("express");
const logger = require("./utils/logger");
const morgan = require("morgan");
const ErrorRoute = require("./utils/error");
const recipeRoute = require("./routes/reciperoutes");
const app = express();

// to parse the data
app.use(express.json());

// middeware to log
app.use(logger);
app.use(morgan("dev"));

// route path
app.use("/recipe", recipeRoute);
// error route
app.use(ErrorRoute);

app.use("/api/v1/auth",recipeRoute);

module.exports = app;
