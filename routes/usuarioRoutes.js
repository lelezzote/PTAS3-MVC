const router = require("express").Router();

const UsuarioController = require("../controllers/UsuarioController");

router.post("/cadastro", UsuarioController.cadastrar);

router.post("/auth/login", UsuarioController.login);

module.exports = router;