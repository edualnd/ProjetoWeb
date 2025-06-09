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

const refreshTokenController = async (req, res) => {
  const accessToken = req.body.accessToken;
  const { deviceId, exp, sub } = decodeToken(accessToken);
  const date = Math.floor(Date.now() / 1000);
  const isValid = date <= exp + 3600;
  if (deviceId != req.cookies?.deviceId || !isValid) {
    await deleteSession(req.cookies?.deviceId);
    res.clearCookie('refreshToken', {
      path: '/refresh',
    });
    res.clearCookie('id', {
      path: '/auth',
    });
    return res.status(400).json({
      message: 'Faça login',
      error: 'Access Token invalido',
    });
  }

  const { success, data } = validateRefreshToken(req.cookies?.refreshToken);
  if (!success || data.userId != sub || data.deviceId != deviceId) {
    await deleteSession(deviceId);
    res.clearCookie('refreshToken', {
      path: '/refresh',
    });
    res.clearCookie('id', {
      path: '/auth',
    });
    return res.status(401).json({
      message: 'Faça login',
      error: 'Refresh token invalido',
    });
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
    return res.status(401).json({
      message: 'Faça login',
      error: 'Não existe sessao',
    });
  }

  await deleteSession(deviceId);
  const newAaccessToken = generateAccessToken(deviceId, sub);
  const sessionId = crypto.randomUUID();
  const newRefreshToken = generateRefreshToken(deviceId, sub, sessionId);
  const expiredAt = dayjs()
    .add(process.env.RT_EXPIRE_INT, process.env.RT_EXPIRE_TIME)
    .toDate();
  const sessionData = {
    userId: sub,
    deviceId,
    sessionId,
    expiredAt,
  };

  const newSession = await createSession(sessionData);
  if (!newSession) {
    return res.status(500).json({
      message: 'Problema ao criar uma sessão',
    });
  }
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    expires: expiredAt,
    path: '/refresh',
  });
  res.cookie('id', user.userId, {
    httpOnly: true,
    sameSite: 'strict',
    expires: expiredAt,
    path: '/auth',
  });
  return res.status(200).json({
    message: 'Refresh token controller is working',
    accessToken: newAaccessToken,
  });
};

export default refreshTokenController;
