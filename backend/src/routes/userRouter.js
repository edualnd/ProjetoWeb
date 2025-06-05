import express from 'express';
import logoutController from '../controllers/user/logoutController.js';
import roleController from '../controllers/user/roleController.js';
import usernameController from '../controllers/user/usernameController.js';
import editUserController from '../controllers/user/editUserController.js';
const router = express.Router();

//TODO: Trocar a senha 
//TODO: Trocar email 
//ToDO: delete account
//TODO: edit no user (bio, image)

router.patch("/edit", editUserController)
router.patch('/change-username', usernameController)
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
