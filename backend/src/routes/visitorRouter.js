import express from 'express';
import registerController from '../controllers/users/registerController.js';
import loginController from '../controllers/users/loginController.js';

const router = express.Router();


//TODO: Cadastro
router.post("/register", registerController)
//TODO: Login
router.post("/login", loginController)

//TODO: Visualizar perfil

//TODO: Visualizar posts

//TODO: Visualizar seguidores e seguindo

//TODO: Visualizar comentarios

//TODO: Visualizar avaliações




export default router;