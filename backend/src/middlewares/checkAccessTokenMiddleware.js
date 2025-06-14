import { getUserData } from '../model/userModel.js';
import { validateAccessToken } from '../utils/security/jwt/token.js';
import CustomError from '../errors/CustomErrors.js';
const checkAccessTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const { success, data, error } = validateAccessToken(token);
    const id = req.cookies?.id;

    if (!success || data.sub != id) {
      throw new CustomError(401, 'Token invalido');
    }
    const user = await getUserData(data.sub);
    req.user = { ...user, deviceId: data.deviceId };
    next();
  } catch (e) {
    next(e);
  }
};

export default checkAccessTokenMiddleware;
