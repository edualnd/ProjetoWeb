import { totp } from 'otplib';

totp.options = { digits: 6, step: 300, window: 1 };

const createSecret = (email, userId) => {
  return `${process.env.OTP_SECRET}+${email}+${userId}`;
};

const generateOTP = (secret) => {
  return totp.generate(secret);
};

const verifyOTP = (token, secret) => {
  return totp.check(token, secret, { window: 1 });
};

export { generateOTP, verifyOTP, createSecret };
