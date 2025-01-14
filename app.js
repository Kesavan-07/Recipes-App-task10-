const express = require("express");
const logger = require("./utils/logger");
const morgan = require("morgan");
const ErrorRoute = require("./utils/error");
const recipeRoute = require("./routes/reciperoutes");
const app = express();


// To parse the data
app.use(express.json());


// Middleware to log
app.use(logger);
app.use(morgan("dev"));


// Route paths
app.use("/api/v1/auth", recipeRoute);


// Error handling middleware (keep it last)
app.use(ErrorRoute);

module.exports = app;
