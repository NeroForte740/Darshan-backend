import express from "express";

import route_func from "./app/routes/funcionarios";
import route_prod from "./app/routes/produtos";
import route_ped from "./app/routes/pedidos";
import route_pag from "./app/routes/pagamentos";

const app = express();

app.use(express.json());

app.use(route_func, route_ped, route_prod, route_pag);

app.listen(3838, () => console.log("server started! http://localhost:3838"));
