import express from 'express';
import logoutController from '../controllers/user/logoutController.js';
import roleController from '../controllers/user/roleController.js';
const router = express.Router();

//TODO: Trocar a senha
//TODO: Trocar email
//TODO: edit no user (bio, image)
//TODO: change username 
//TODO: change role
router.patch('/change-role', roleController);
router.get('/logout', logoutController);

router.get('/', (req, res) => {


  return res.status(200).json({
    data: req.user,
    userId: req.user.userId,
    message: 'User route is working',
  });
});

export default router;
