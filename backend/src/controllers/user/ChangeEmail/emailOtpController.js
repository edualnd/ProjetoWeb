import { checkRegisteredCredentials } from '../../../model/userModel.js';
import validateSchema from '../../../utils/validators/schemaValidator.js';
import { userSchema } from '../../../schemas/userSchema.js';
import {
  createSecret,
  generateOTP,
} from '../../../utils/security/otplib/otp.js';
import { sendEmail } from '../../../utils/security/Email/config.js';
import { emailChangeTemplate } from '../../../utils/security/Email/emailTemplates.js';

import CustomError from '../../../errors/CustomErrors.js';
const emailOtpController = async (req, res, next) => {
  try {
    const { newEmail } = req.body;
    const { email, userId, username } = req.user;

    const { success } = await validateSchema(
      userSchema,
      { email: newEmail },
      { username: true, password: true },
    );
    if (!success) {
      throw new CustomError(
        400,
        'Dados inválidos: verifique e tente novamente',
      );
    }
    const checkEmail = await checkRegisteredCredentials(newEmail, '');
    if (checkEmail) {
      throw new CustomError(409, 'Email já cadastrado');
    }

    const secret = createSecret(`${email}-${newEmail}`, userId);
    const otp = generateOTP(secret);
    const emailContent = emailChangeTemplate(username, otp);
    const emailData = {
      to: `${username} ${newEmail}`,
      ...emailContent,
    };
    const emailSent = await sendEmail(emailData);
    if (!emailSent) {
      throw new CustomError(
        400,
        'Dados inválidos: verifique e tente novamente',
      );
    }
    return res.status(200).json({
      success: true,
      message: `Um email foi enviado para ${newEmail}, para continuar acesse o link gerado`,
    });
  } catch (e) {
    next(e);
  }
};
export default emailOtpController;
