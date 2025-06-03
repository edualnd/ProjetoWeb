import { getUserData } from '../model/userModel.js';
import { validateAccessToken } from '../utils/security/token.js';

const checkToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  const { success, data, error } = validateAccessToken(token);
  if (!success) {
    return res.status(401).json({
      message: 'Unauthorized',
      error: error || 'Invalid token',
    });
  }
  const user = await getUserData(data.sub);
  req.user = user;
  next();
};

export default checkToken;
