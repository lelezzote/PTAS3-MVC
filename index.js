
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/enviar', (req, res) => {
  const { nome, email } = req.body;
  console.log('Dados recebidos:', nome, email);

  
  res.json({ message: `Obrigado, ${nome}! Seu email (${email}) foi recebido.` });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
