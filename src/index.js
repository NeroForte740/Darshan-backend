import express from "express";

import route_func from "./app/routes/funcionarios";
import route_prod from "./app/routes/produtos";
import route_ped from "./app/routes/pedidos";
import route_pag from "./app/routes/pagamentos";

const cors = require('cors');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.use(route_func, route_ped, route_prod, route_pag);

app.listen(port, () => console.log("server started! http://localhost:",port));
