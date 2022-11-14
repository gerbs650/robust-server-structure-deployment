const express = require("express");

const urlsRouter = require("./urls/urls.router")
const usesRouter = require("./uses/uses.router")
const pathNotFound = require("./errors/pathNotFound")

const app = express();

app.use(express.json());

// == Router Handlers ==

app.use("/urls", urlsRouter)
app.use("/uses", usesRouter)



app.use(pathNotFound)
  

// == Error Handler ==
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
