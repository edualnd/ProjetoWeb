import { getUserData } from '../model/userModel.js';
import {
  validateAccessToken,
} from '../utils/security/jwt/token.js';

const checkAccessTokenMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  const { success, data, error } = validateAccessToken(token);
  const id = req.cookies?.id;

  if (!success || data.sub != id) {
    return res.status(401).json({
      message: 'Unauthorized',
      error: error || 'Invalid token',
    });
  }
  const user = await getUserData(data.sub);
  req.user = { ...user, deviceId: data.deviceId };
  next();
};

export default checkAccessTokenMiddleware;
