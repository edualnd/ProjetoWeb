import { validateForgotPassToken } from '../utils/security/jwt/token.js';

const checkForgotPassTokenMiddleware = async (req, res, next) => {
  const token = req.params?.token;
  const { success, data, error } = validateForgotPassToken(token);

  if (!success) {
    return res.status(401).json({
      message: 'Unauthorized',
      error: error || 'Invalid token',
    });
  }
  req.user = { userId: data.sub };
  next();
};

export default checkForgotPassTokenMiddleware;
