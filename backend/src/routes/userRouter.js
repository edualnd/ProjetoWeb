import express from 'express';
import logoutController from '../controllers/user/logoutController.js';
const router = express.Router();


router.get('/logout', logoutController);
router.get('/', (req, res) => {


  return res.status(200).json({
    data: req.user,
    userId: req.user.userId,
    message: 'User route is working',
  });
});

router.post('/', (req, res) => {
  const texto = req.body.texto;

  return res.status(200).json({
    data: req.user,
    userId: req.user.userId,
    message: 'User route is working',
    texto
  });
});
export default router;
