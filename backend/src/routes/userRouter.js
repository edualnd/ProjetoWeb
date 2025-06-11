import express from 'express';
import roleController from '../controllers/user/roleController.js';
import usernameController from '../controllers/user/usernameController.js';
import editUserController from '../controllers/user/editUserController.js';
import deleteController from '../controllers/user/deleteController.js';
import autheticateMiddleware from '../middlewares/autheticateMiddleware.js';
import passwordController from '../controllers/user/passwordController.js';
import emailController from '../controllers/user/ChangeEmail/emailController.js';
import verifyOTPMiddleware from '../middlewares/verifyOTPMiddleware.js';
import emailOtpController from '../controllers/user/ChangeEmail/emailOtpController.js';
import logoutController from '../controllers/user/auth/logoutController.js';
import upload from '../utils/multer/config.js';
const router = express.Router();


router.patch('/edit', upload.single('avatar'), editUserController);

router.patch('/change-username', usernameController);

router.patch('/change-role', roleController);

router.patch('/change-password', passwordController);


router.post('/send-email-otp', autheticateMiddleware, emailOtpController);
router.patch('/change-email', verifyOTPMiddleware, emailController);

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
