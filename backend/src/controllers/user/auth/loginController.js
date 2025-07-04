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
import CustomError from '../../../errors/CustomErrors.js';

const loginController = async (req, res, next) => {
  try {
    const { data, password } = req.body;

    const user = await checkLoginCredentials(data);

    const typeOfData = data.includes('@') ? 'email' : 'username';
    if (!user) {
      throw new CustomError(401, `Erro, ${typeOfData} ou senha incorreto`);
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new CustomError(401, `Erro, ${typeOfData} ou senha incorreto`);
    }

    const deviceId = req.cookies?.deviceId;
    await deleteSession(deviceId);

    const accessToken = generateAccessToken(deviceId, user.userId);
    const sessionId = crypto.randomUUID();
    const refreshToken = generateRefreshToken(deviceId, user.userId, sessionId);

    const expiredAt = dayjs()
      .add(process.env.RT_EXPIRE_INT, process.env.RT_EXPIRE_TIME)
      .toDate();
    console.log(deviceId);

    const sessionData = {
      userId: user.userId,
      deviceId: deviceId,
      sessionId,
      expiredAt,
    };

    const session = await createSession(sessionData);
    if (!session) {
      throw new Error();
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
    const { password: psw, ...loggedUser } = user;
    return res.status(200).json({
      success: true,
      message: 'Logado',
      user: loggedUser,
      accessToken,
    });
  } catch (e) {
    next(e);
  }
};

export default loginController;
