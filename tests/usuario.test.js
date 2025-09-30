const request = require("supertest");
const app = require("../index");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

beforeAll(async () => {
  // limpa tabela antes dos testes
  await prisma.usuario.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Testes de autenticação", () => {
  test("Deve cadastrar um novo usuário", async () => {
    const res = await request(app)
      .post("/usuario/cadastro")
      .send({
        nome: "teste",
        email: "teste@exemplo.com",
        senha: "abcd",
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("usuarioId");
  });

  test("Deve logar com usuário válido", async () => {
    const res = await request(app)
      .post("/usuario/login")
      .send({
        email: "teste@exemplo.com",
        senha: "abcd",
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("Deve falhar login com senha incorreta", async () => {
    const res = await request(app)
      .post("/usuario/login")
      .send({
        email: "teste@exemplo.com",
        senha: "senhaerrada",
      });

    expect(res.status).toBe(200); // sua API retorna 200 mesmo com erro
    expect(res.body.msg).toBe("Senha incorreta!");
  });

  test("Deve falhar login com usuário inexistente", async () => {
    const res = await request(app)
      .post("/usuario/login")
      .send({
        email: "leticia@exemplo.com",
        senha: "345678",
      });

    expect(res.status).toBe(200);
    expect(res.body.msg).toBe("Usuário não existe!");
  });
});
