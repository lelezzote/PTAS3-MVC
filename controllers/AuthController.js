const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  // rota de cadastro
  async cadastro(req, res) {
    try {
      const { nome, email, password } = req.body;

      // verifica se já existe usuário com esse email
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { email },
      });
      if (usuarioExistente) {
        return res.json({
          mensagem: "Email já cadastrado",
          erro: true,
        });
      }

      // criptografa a senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // cria usuário
      const novoUsuario = await prisma.usuario.create({
        data: {
          nome,
          email,
          password: hashedPassword,
        },
      });

      // gera token
      const token = jwt.sign(
        { id: novoUsuario.id, email: novoUsuario.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.json({
        mensagem: "Usuário cadastrado com sucesso",
        erro: false,
        token,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        mensagem: "Erro no servidor",
        erro: true,
      });
    }
  },

  // rota de login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // busca usuário
      const usuario = await prisma.usuario.findUnique({
        where: { email },
      });

      if (!usuario) {
        return res.json({
          mensagem: "Usuário não encontrado",
          erro: true,
        });
      }

      // compara senha
      const senhaCorreta = await bcrypt.compare(password, usuario.password);
      if (!senhaCorreta) {
        return res.json({
          mensagem: "Senha incorreta",
          erro: true,
        });
      }

      // gera token
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.json({
        mensagem: "Login realizado com sucesso",
        erro: false,
        token,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        mensagem: "Erro no servidor",
        erro: true,
      });
    }
  },
};
