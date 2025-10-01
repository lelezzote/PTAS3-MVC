const request = require("supertest");
const app = require("./app");

test("POST /usuario/cadastro deve cadastrar usuário", async () => {
  const res = await request(app)
    .post("/usuario/cadastro")
    .send({ 
      nome: "verificar", 
      email: "verificar12@email.com", 
      senha: "123"
     });

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("usuarioId");
});

test("POST /usuario/login deve logar com sucesso", async () => {S
  const res = await request(app)
    .post("/usuario/login")
    .send({ 
      email: "verificar12@email.com", 
      senha: "123" 
    });

  expect(res.status).toBe(200);
  expect(res.body.msg).toBe("Autenticado com sucesso!");
  expect(res.body).toHaveProperty("token");
});

test("POST /usuario/login deve falhar com senha incorreta", async () => {
  const res = await request(app)
    .post("/usuario/login")
    .send({ 
      email: "verificar12@email.com", 
      senha: "incorreta" 
    });

  expect(res.status).toBe(200); 
  expect(res.body.msg).toBe("Senha incorreta!");
});

test("POST /usuario/login deve falhar com usuário inexistente", async () => {
  const res = await request(app)
    .post("/usuario/login")
    .send({ 
      email: "inexistente12@email.com", 
      senha: "123" 
    });

  expect(res.status).toBe(200); 
  expect(res.body.msg).toBe("Usuário não existe!");
});

