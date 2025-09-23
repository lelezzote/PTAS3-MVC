const express = require("express");
const usuarioRoutes = require("./routes/usuarioRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

// Rotas
app.use("/usuario", usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
