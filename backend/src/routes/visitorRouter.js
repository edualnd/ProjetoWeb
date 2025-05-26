import express from 'express';
import registerController from '../controllers/users/registerController.js';
import loginController from '../controllers/users/loginController.js';
import prisma from '../utils/prisma/db.js';

const router = express.Router();

//TODO: Cadastro
router.post('/register', registerController);
//TODO: Login
router.post('/login', loginController);

//TODO: Visualizar perfil
router.get('/profiles', async (req, res) => {
  const profiles = await prisma.user.findMany({
    omit: {
      password: true,
      userId: true,
    },
  });
  res.status(200).json({
    message: 'Success true, profile retrieved',
    profiles: profiles,
  });
});
//TODO: Visualizar posts

//TODO: Visualizar seguidores e seguindo

//TODO: Visualizar comentarios

//TODO: Visualizar avaliações

export default router;
