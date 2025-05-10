const app = require("./app");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 3001;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.listen(port, console.log(`http://localhost:${port}/produtos`));
