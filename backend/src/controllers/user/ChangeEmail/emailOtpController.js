import { checkRegisteredCredentials } from '../../../model/userModel.js';
import validateSchema from '../../../utils/validators/schemaValidator.js';
import { userSchema } from '../../../schemas/userSchema.js';
import {
  createSecret,
  generateOTP,
} from '../../../utils/security/otplib/otp.js';
import { sendEmail } from '../../../utils/security/Email/config.js';
import { emailChangeTemplate } from '../../../utils/security/Email/emailTemplates.js';
const emailOtpController = async (req, res) => {
  const { newEmail } = req.body;
  const { email, userId, username } = req.user;

  const { success, error, data } = await validateSchema(
    userSchema,
    { email: newEmail },
    { username: true, password: true },
  );
  if (!success) {
    return res.status(400).json({
      message: error?.issues[0].message || 'Email inválido',
    });
  }
  const checkEmail = await checkRegisteredCredentials(newEmail, '');
  if (checkEmail) {
    return res.status(400).json({
      message: 'Email já em uso',
    });
  }

  const secret = createSecret(`${email}-${newEmail}`, userId);
  const otp = generateOTP(secret);
  const emailContent = emailChangeTemplate(username, otp);
  const emailData = {
    to: `${username} ${newEmail}`,
    ...emailContent,
  };
  const emailSent = await sendEmail(emailData);
  return res.status(200).json({
    message: `Um email foi enviado para ${newEmail}, para continuar acesse o link gerado`,
    otp,
  });
};
export default emailOtpController;
