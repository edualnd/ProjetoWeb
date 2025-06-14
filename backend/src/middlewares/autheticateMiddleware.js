import { checkLoginCredentials } from '../model/userModel.js';
import { compare } from '../utils/security/bcrypt/bcryptUtils.js';
import CustomError from '../errors/CustomErrors.js';
const autheticateMiddleware = async (req, res, next) => {
  try {
    const password = req.body.password;
    const email = req.user.email;
    const user = await checkLoginCredentials(email);

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new CustomError(401, 'Senha inválida');
    }
    next();
  } catch (e) {
    next(e);
  }
};

export default autheticateMiddleware;
