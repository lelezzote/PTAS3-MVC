const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

// rota de cadastro
router.post("/cadastro", AuthController.cadastro);

// rota de login
router.post("/login", AuthController.login);

module.exports = router;
