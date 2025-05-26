import jwt from 'jsonwebtoken';

const generateRefreshToken = (deviceId, userId, sessionId) => {
  const token = jwt.sign(
    { sub: sessionId, deviceId, userId },
    process.env.RT_SECRET,
    {
      expiresIn: process.env.RT_EXPIRESIN,
    },
  );
  return token;
};

const generateAccessToken = (deviceId, userId) => {
  const token = jwt.sign({ sub: userId, deviceId }, process.env.AT_SECRET, {
    expiresIn: process.env.AT_EXPIRESIN,
  });
  return token;
};

const validateAccessToken = (token) => {
  const isValid = jwt.verify(token, process.env.AT_SECRET, (err, decoded) => {
    if (err) {
      return {
        success: false,
        error: err.cause,
      };
    }
    return {
      sucess: true,
      data: decoded,
    };
  });
  return isValid;
};

const validateRefreshToken = (token) => {
  const isValid = jwt.verify(token, process.env.RT_SECRET, (err, decoded) => {
    if (err) {
      return {
        success: false,
        error: err.message,
      };
    }
    return {
      sucess: true,
      data: decoded,
    };
  });
  return isValid;
};

export {
  generateAccessToken,
  generateRefreshToken,
  validateAccessToken,
  validateRefreshToken,
};
