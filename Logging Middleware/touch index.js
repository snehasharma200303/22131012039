
const express = require("express");
const log = require("./loggingMiddleware");

const app = express();

app.get("/", async (req, res) => {
  await log("INFO", "Homepage hit hua");
  res.send("Hello Sneha, Logging Middleware is working!");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  log("INFO", "Server started successfully");
});
