import express from 'express';
import logoutController from '../controllers/user/logoutController.js';
import roleController from '../controllers/user/roleController.js';
import usernameController from '../controllers/user/usernameController.js';
import editUserController from '../controllers/user/editUserController.js';
import deleteController from '../controllers/user/deleteController.js';
import autheticateMiddleware from '../middlewares/autheticateMiddleware.js';
import passwordController from '../controllers/user/passwordController.js';
import emailController from '../controllers/user/emailController.js';
const router = express.Router();





//TODO: edit no user (bio, image)
router.patch('/edit', editUserController);

router.patch('/change-username', usernameController);

router.patch('/change-role', roleController);

router.patch('/change-password', passwordController);

//TODO: Trocar email
router.patch('/change-email', autheticateMiddleware, emailController);

router.get('/logout', logoutController);

router.delete('/delete/me', autheticateMiddleware, deleteController);


router.get('/', (req, res) => {
  return res.status(200).json({
    data: req.user,
    userId: req.user.userId,
    message: 'User route is working',
  });
});

export default router;
