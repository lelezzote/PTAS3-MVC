const express = require("express");
const usuarioRoutes = require("../routes/usuarioRoutes");

const app = express();
app.use(express.json());

app.use("/usuario", usuarioRoutes);
app.get("/", (req, res) => res.send("Servidor funcionando"));

module.exports = app;
