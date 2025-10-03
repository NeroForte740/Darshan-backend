const express = require("express");
const server = express();

server.get("/hello", (req, res) => {
  return res.json({
    message: "hello",
  });
});

server.listen(3000, console.log("http://localhost:3000"));
