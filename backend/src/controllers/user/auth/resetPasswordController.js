import { changePassword } from '../../../model/userModel.js';
import { hashPass } from '../../../utils/security/bcrypt/bcryptUtils.js';

const resetPasswordController = async (req, res) => {
  const { newPassword } = req.body;
  const userId = req.user.userId;

  const passwordHash = await hashPass(newPassword);
  const changeUser = await changePassword(userId, passwordHash);

  if (!changeUser) {
    return res.status(400).json({
      message: 'Success false, error changing password',
    });
  }
  return res.status(200).json({
    message: 'Success true, password changed successfully',
  });
};
export default resetPasswordController;
