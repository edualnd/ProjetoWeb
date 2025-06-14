import { deleteSession } from '../../../utils/security/session/session.js';

const logoutController = async (req, res, next) => {
  try {
    const { userId, deviceId } = req.user;

    await deleteSession(deviceId);

    res.clearCookie('refreshToken', {
      path: '/refresh',
    });
    res.clearCookie('id', {
      path: '/auth',
    });
    return res.status(200).json({
      sucess: true,
      message: 'Logout com sucesso',
      userId,
      deviceId,
    });
  } catch (e) {
    next(e);
  }
};

export default logoutController;
