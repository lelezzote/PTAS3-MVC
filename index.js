const express = require("express");
const usuarioRoutes = require("./routes/usuarioRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

// rotas
app.use("/usuario", usuarioRoutes);
app.get("/", (req, res) => res.send("Servidor funcionando"));

// inicia servidor se rodar diretamente
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app; // exporta o app para os testes
