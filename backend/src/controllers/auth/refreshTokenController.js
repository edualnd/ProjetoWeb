import dayjs from 'dayjs';
import {
  createSession,
  deleteExpiredSession,
  deleteSession,
  findSession,
} from '../../utils/security/session/session.js';
import {
  decodeToken,
  generateAccessToken,
  generateRefreshToken,
  validateRefreshToken,
} from '../../utils/security/jwt/token.js';
import CustomError from '../../errors/CustomErrors.js';

const refreshTokenController = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    const { deviceId, userId } = decodeToken(refreshToken);
    if (deviceId != req.cookies?.deviceId) {
      await deleteSession(req.cookies?.deviceId);
      res.clearCookie('refreshToken', {
        path: '/refresh',
      });
      res.clearCookie('id', {
        path: '/auth',
      });
      throw new CustomError(401, 'Faça login');
    }

    const { success } = validateRefreshToken(refreshToken);
    if (!success) {
      await deleteSession(deviceId);
      res.clearCookie('refreshToken', {
        path: '/refresh',
      });
      res.clearCookie('id', {
        path: '/auth',
      });
      throw new CustomError(401, 'Faça login');
    }

    const session = await findSession(deviceId);
    if (!session) {
      await deleteExpiredSession(deviceId);
      res.clearCookie('refreshToken', {
        path: '/refresh',
      });
      res.clearCookie('id', {
        path: '/auth',
      });
      throw new CustomError(401, 'Faça login');
    }

    await deleteSession(deviceId);
    const newAccessToken = generateAccessToken(deviceId, userId);
    const sessionId = crypto.randomUUID();
    const newRefreshToken = generateRefreshToken(deviceId, userId, sessionId);
    const expiredAt = dayjs()
      .add(process.env.RT_EXPIRE_INT, process.env.RT_EXPIRE_TIME)
      .toDate();
    const sessionData = {
      userId,
      deviceId,
      sessionId,
      expiredAt,
    };

    const newSession = await createSession(sessionData);
    if (!newSession) {
      throw new Error();
    }
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      expires: expiredAt,
      path: '/refresh',
    });
    res.cookie('id', userId, {
      httpOnly: true,
      sameSite: 'strict',
      expires: expiredAt,
      path: '/auth',
    });
    return res.status(200).json({
      success: true,
      message: 'Novo access token criado',
      accessToken: newAccessToken,
    });
  } catch (e) {
    next(e);
  }
};

export default refreshTokenController;
