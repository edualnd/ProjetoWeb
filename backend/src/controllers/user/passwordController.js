import {
  changePassword,
  checkLoginCredentials,
} from '../../model/userModel.js';
import { compare, hashPass } from '../../utils/security/bcrypt/bcryptUtils.js';
import CustomError from '../../errors/CustomErrors.js';
const passwordController = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { email, userId } = req.user;
    const user = await checkLoginCredentials(email);

    const isValidPassword = await compare(oldPassword, user.password);
    if (!isValidPassword) {
      throw new CustomError(401, 'Senha invalida');
    }
    const newPasswordHash = await hashPass(newPassword);
    const userChanged = await changePassword(userId, newPasswordHash);

    if (!userChanged) {
      throw new Error();
    }
    return res.status(200).json({
      message: 'Senha atualiza com sucesso',
    });
  } catch (e) {
    next(e);
  }
};

export default passwordController;
