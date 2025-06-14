import { changePassword } from '../../../model/userModel.js';
import { hashPass } from '../../../utils/security/bcrypt/bcryptUtils.js';

const resetPasswordController = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const userId = req.user.userId;

    const passwordHash = await hashPass(newPassword);
    const changeUser = await changePassword(userId, passwordHash);

    if (!changeUser) {
      throw new Error();
    }
    return res.status(200).json({
      success: true,
      message: 'Senha trocada',
    });
  } catch (e) {
    next(e);
  }
};
export default resetPasswordController;
