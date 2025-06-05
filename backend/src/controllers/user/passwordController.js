import {
  changePassword,
  checkLoginCredentials,
} from '../../model/userModel.js';
import { compare, hashPass } from '../../utils/security/bcrypt/bcryptUtils.js';
const passwordController = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { email, userId } = req.user;
  const user = await checkLoginCredentials(email);

  const isValidPassword = await compare(oldPassword, user.password);
  if (!isValidPassword) {
    return res.status(401).json({
      message: 'Invalid password',
      error: 'authentication failed',
    });
  }
  const newPasswordHash = await hashPass(newPassword);
  const userChanged = await changePassword(userId, newPasswordHash);

  if (!userChanged) {
    return res.status(500).json({
      message: 'Error changing password',
    });
  }
  return res.status(200).json({
    message: 'Password changed successfully',
    user: {
      userId: userChanged.userId,
      email: userChanged.email,
      username: userChanged.username,
      role: userChanged.role,
    },
  });
};

export default passwordController;
