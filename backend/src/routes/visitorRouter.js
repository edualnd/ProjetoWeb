import express from 'express';

import prisma from '../utils/prisma/db.js';
import profileController from '../controllers/user/profileController.js';

import loginController from '../controllers/user/auth/loginController.js';
import registerController from '../controllers/user/auth/registerController.js';
import forgotPasswordController from '../controllers/user/auth/forgotPasswordController.js';
import resetPasswordController from '../controllers/user/auth/resetPasswordController.js';
import checkForgotPassTokenMiddleware from '../middlewares/checkForgotPassTokenMiddleware.js';
import refreshTokenController from '../controllers/auth/refreshTokenController.js';
const router = express.Router();

router.post('/refresh', refreshTokenController);

router.post('/register', registerController);

router.post('/login', loginController);

router.get('/profile/:username', profileController);

router.post('/forgot-password', forgotPasswordController);
router.post(
  '/reset-password/:token',
  checkForgotPassTokenMiddleware,
  resetPasswordController,
);

//TODO: Visualizar posts

router.get("/post", async (req, res) =>{
  const post = await prisma.publication.findMany({
    where: {Comments:{some:{}}},
    select:{
      publicationId: true,
      Comments: true
    }
  })
  return res.status(200).json({
    post
  })
})

//TODO: Visualizar seguidores e seguindo

//TODO: Visualizar comentarios

//TODO: Visualizar avaliações

export default router;
