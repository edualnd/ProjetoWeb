import {
  deleteExpiredSession,
  deleteSession,
  findSession,
} from '../../utils/security/session.js';
import {
  decodeAccessToken,
  generateAccessToken,
  generateRefreshToken,
  validateRefreshToken,
} from '../../utils/security/token.js';

const refreshTokenController = async (req, res) => {
  const accessToken = req.body.accessToken;
  const { deviceId, exp, sub } = decodeAccessToken(accessToken);
  const date = Math.floor(Date.now() / 1000);

  const isValid = date <= exp + 3600000;

  if (deviceId != req.cookies?.deviceId || !isValid) {
    await deleteSession(req.cookies?.deviceId);
    return res.status(400).json({
      message: 'Faça login',
      error: 'Access Token invalido',
    });
  }

  const { success } = validateRefreshToken(req.cookies?.refreshToken);
  if (!success) {
    await deleteSession(deviceId);
    return res.status(401).json({
      message: 'Faça login',
      error: 'Refresh token invalido',
    });
  }

  const session = await findSession(deviceId);
  if (!session) {
    await deleteExpiredSession(deviceId);
    return res.status(401).json({
      message: 'Faça login',
      error: 'Não existe sessao',
    });
  }

  await deleteSession(deviceId);
  const newAaccessToken = generateAccessToken(deviceId, sub);
  const sessionId = crypto.randomUUID();
  const newRefreshToken = generateRefreshToken(
    deviceId,
    sub,
    sessionId,
  );
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
  if(!newSession){
    return res.status(500).json({
    message: 'Problema ao criar uma sessão',
  });
  }
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    expiresIn: expiredAt,
    path: '/refresh',
  });
  return res.status(200).json({
    message: 'Refresh token controller is working',
    accessToken: newAaccessToken,
  });
};

export default refreshTokenController;
