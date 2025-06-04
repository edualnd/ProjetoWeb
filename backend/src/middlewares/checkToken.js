import { getUserData } from '../model/userModel.js';
import { decodeRefreshToken, validateAccessToken } from '../utils/security/token.js';

const checkToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  const { success, data, error } = validateAccessToken(token);
  console.log(req.cookies?.refreshToken);
  
  const date =  decodeRefreshToken(req.cookies?.refreshToken);
  console.log(date)
  if (!success || data.sub != date.userId) {
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
