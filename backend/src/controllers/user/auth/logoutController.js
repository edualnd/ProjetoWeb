import { deleteSession } from '../../../utils/security/session/session.js';

const logoutController = async (req, res) => {
  const { userId, deviceId } = req.user;

  await deleteSession(deviceId);

  res.clearCookie('refreshToken', {
    path: '/refresh',
  });
  res.clearCookie('id', {
    path: '/auth',
  });
  return res.status(200).json({
    message: 'Logout successful',
    userId,
    deviceId,
  });
};

export default logoutController;
