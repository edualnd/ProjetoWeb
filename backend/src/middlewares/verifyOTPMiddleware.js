import { createSecret, verifyOTP } from '../utils/security/otplib/otp.js';

const verifyOTPMiddleware = (req, res, next) => {
  const { tokenOTP, newEmail } = req.body;
  const { email, userId } = req.user;
  const secret = createSecret(`${email}-${newEmail}`, userId);

  const isValid = verifyOTP(tokenOTP, secret);
  if (!tokenOTP || !isValid) {
    return res.status(400).json({
      message: 'Token invalido',
    });
  }

  next();
};

export default verifyOTPMiddleware;
