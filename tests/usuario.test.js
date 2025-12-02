// importar o supertest para fazer requisições HTTP ao app (simula um client)
const request = require("supertest");

// importar o app Express que você já exportou (index.js ou ./app)
const app = require("./app");

// --- Teste 1: cadastra usuário ---
test("POST /usuario/cadastro deve cadastrar usuário", async () => {
  // Faz uma requisição POST para /usuario/cadastro com um corpo JSON
  const res = await request(app)
    .post("/usuario/cadastro")
    .send({
      nome: "verificar",
      email: "verificar123@email.com",
      // Note: seu controller espera o campo 'senha' ou 'password' — ajuste se necessário
      password: "123"
    });

  // Expectativa: o status HTTP retornado deve ser 200 (OK)
  // .toBe faz uma comparação estrita (===)
  expect(res.status).toBe(200);

  // Expectativa: o corpo da resposta deve conter a propriedade "usuarioId"
  // toHaveProperty verifica que o objeto possui a chave especificada.
  // Útil para confirmar que o usuário foi criado e o id foi retornado.
  expect(res.body).toHaveProperty("usuarioId");
});


// --- Teste 2: login com sucesso ---
test("POST /usuario/login deve logar com sucesso", async () => {
  // Faz uma requisição POST para /usuario/login com email e senha
  const res = await request(app)
    .post("/usuario/login")
    .send({
      email: "verificar123@email.com",
      password: "123"
    });

  // Espera status 200
  expect(res.status).toBe(200);

  // Espera que a mensagem de resposta seja exatamente "Autenticado com sucesso!"
  // toBe compara valores primitivos com igualdade estrita.
  expect(res.body.msg).toBe("Autenticado com sucesso!");

  // Espera que o corpo da resposta contenha a propriedade "token"
  // Geralmente o token JWT é retornado no login; toHaveProperty garante que existe.
  expect(res.body).toHaveProperty("token");
});


// --- Teste 3: senha incorreta ---
test("POST /usuario/login deve falhar com senha incorreta", async () => {
  // Tenta logar com a senha errada
  const res = await request(app)
    .post("/usuario/login")
    .send({
      email: "verificar123@email.com",
      password: "incorreta"
    });

  // Espera status 200 — seu controller está retornando 200 com msg de erro.
  // Observação: em APIs REST é comum usar 401/403 para credenciais inválidas,
  // mas aqui o teste reflete o comportamento atual do controller.
  expect(res.status).toBe(200);

  // Verifica que a mensagem indica "Senha incorreta!"
  // toBe compara a string exatamente.
  expect(res.body.msg).toBe("Senha incorreta!");
});


// --- Teste 4: usuário inexistente ---
test("POST /usuario/login deve falhar com usuário inexistente", async () => {
  // Tenta logar com um email que não existe no banco
  const res = await request(app)
    .post("/usuario/login")
    .send({
      email: "inexistente123@email.com",
      password: "123"
    });

  // Espera status 200 (novamente, de acordo com o comportamento atual do controller)
  expect(res.status).toBe(200);

  // Verifica que a mensagem retornada é "Usuário não existe!"
  expect(res.body.msg).toBe("Usuário não existe!");
});
