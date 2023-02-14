const express = require("express");
const app = express();

app.get("/trial", (req, res) => {
  res.json({
    statusCode: 200,
    statusMessage: "SUCCESS",
    data: "trial",
  });
});

app.listen(3000, (req, res) => {
  console.log("Express API is running at port 3000");
});
