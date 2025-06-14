import { createSecret, verifyOTP } from '../utils/security/otplib/otp.js';
import CustomError from '../errors/CustomErrors.js';
const verifyOTPMiddleware = (req, res, next) => {
  try {
    const { tokenOTP, newEmail } = req.body;
    const { email, userId } = req.user;
    const secret = createSecret(`${email}-${newEmail}`, userId);

    const isValid = verifyOTP(tokenOTP, secret);
    if (!tokenOTP || !isValid) {
      throw new CustomError(401, 'Token inválido');
    }

    next();
  } catch (e) {
    next(e);
  }
};

export default verifyOTPMiddleware;
