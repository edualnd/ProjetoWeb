import { checkLoginCredentials } from '../model/userModel.js';
import { compare } from '..//utils/security/bcryptUtils.js';

const autheticateMiddleware = async (req, res, next) => {
  const password = req.body.password;
  const email = req.user.email;
  const user = await checkLoginCredentials(email);

  const isValidPassword = await compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({
      message: 'Invalid password',
      error: 'authentication failed',
    });
  }
  next();
};

export default autheticateMiddleware;
