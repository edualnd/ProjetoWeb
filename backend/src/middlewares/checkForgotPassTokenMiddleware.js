import { validateForgotPassToken } from '../utils/security/jwt/token.js';
import CustomError from '../errors/CustomErrors.js';
const checkForgotPassTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.params?.token;
    const { success, data, error } = validateForgotPassToken(token);

    if (!success) {
      throw new CustomError(401, 'Token invalido');
    }
    req.user = { userId: data.sub };
    next();
  } catch (e) {
    next(e);
  }
};

export default checkForgotPassTokenMiddleware;
