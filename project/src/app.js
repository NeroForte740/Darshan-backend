const express = require("express");
const routes = require("./routes/routes");
const cors = require("cors");
// const authMiddleware = require("./app/middlewares/auth");

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    // this.server.use(authMiddleware);
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
