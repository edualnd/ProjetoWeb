import { totp } from 'otplib';

totp.options = { digits: 6, step: 300, window: 1 };

const createSecret = (text, userId) => {
  return `${process.env.OTP_SECRET}+${text}+${userId}`;
};

const generateOTP = (secret) => {
  return totp.generate(secret);
};

const verifyOTP = (token, secret) => {
  return totp.check(token, secret, { window: 1 });
};

export { generateOTP, verifyOTP, createSecret };
