import express from 'express';
import roleController from '../controllers/user/roleController.js';
import editUserController from '../controllers/user/editUserController.js';
import deleteController from '../controllers/user/deleteController.js';
import autheticateMiddleware from '../middlewares/autheticateMiddleware.js';
import passwordController from '../controllers/user/passwordController.js';
import emailController from '../controllers/user/ChangeEmail/emailController.js';
import verifyOTPMiddleware from '../middlewares/verifyOTPMiddleware.js';
import emailOtpController from '../controllers/user/ChangeEmail/emailOtpController.js';
import logoutController from '../controllers/user/auth/logoutController.js';
import upload from '../utils/multer/config.js';
import userProfileController from '../controllers/user/auth/userProfileController.js';
const router = express.Router();

router.patch('/edit', upload.single('avatar'), editUserController);

router.patch('/change-role', roleController);

router.patch('/change-password', passwordController);

router.post('/send-email-otp', autheticateMiddleware, emailOtpController);
router.patch('/change-email', verifyOTPMiddleware, emailController);

router.get('/logout', logoutController);

router.delete('/delete', autheticateMiddleware, deleteController);

router.get('/', userProfileController);

export default router;
