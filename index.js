const express = require("express");
const usuarioRoutes = require("./routes/usuarioRoutes");
require("dotenv").config();

console.log("JWT:", process.env.SENHA_TOKEN);

const app = express();
app.use(express.json());

// Rotas
app.use("/usuario", usuarioRoutes);
app.get("/", (req, res) => res.send("Servidor funcionando"));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
