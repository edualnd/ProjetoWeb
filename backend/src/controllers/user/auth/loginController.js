import dayjs from 'dayjs';
import { checkLoginCredentials } from '../../../model/userModel.js';
import { compare } from '../../../utils/security/bcrypt/bcryptUtils.js';
import {
  createSession,
  deleteSession,
} from '../../../utils/security/session/session.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../../utils/security/jwt/token.js';

const loginController = async (req, res) => {
  const { data, password } = req.body;

  const user = await checkLoginCredentials(data);

  const typeOfData = data.includes('@') ? 'email' : 'username';
  if (!user) {
    return res.status(401).json({
      message: `Success false, ${typeOfData} or password incorrect`,
      error: 'not found',
    });
  }

  const isValidPassword = await compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({
      message: `Success false, ${typeOfData} or password incorrect`,
      error: 'psw',
    });
  }

  //Criar refresh token e apagar os antigos(se tiver)
  const deviceId = req.cookies?.deviceId;
  await deleteSession(deviceId);
  //Criar access token e refresh token
  const accessToken = generateAccessToken(deviceId, user.userId);
  const sessionId = crypto.randomUUID();
  const refreshToken = generateRefreshToken(deviceId, user.userId, sessionId);
  //Criar salvar novo refresh token no banco
  const expiredAt = dayjs()
    .add(process.env.RT_EXPIRE_INT, process.env.RT_EXPIRE_TIME)
    .toDate();

  const sessionData = {
    userId: user.userId,
    deviceId: deviceId,
    sessionId,
    expiredAt,
  };

  const session = await createSession(sessionData);
  if (!session) {
    return res.status(500).json({
      message: 'Error creating session',
      error: 'session creation failed',
    });
  }

  res.cookie('refreshToken', refreshToken, {
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
    message: 'Success true',
    user,
    accessToken,
  });
};

export default loginController;
