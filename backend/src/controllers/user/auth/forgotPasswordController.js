import { checkLoginCredentials } from '../../../model/userModel.js';
import { sendEmail } from '../../../utils/security/Email/config.js';
import { forgotPasswordTemplate } from '../../../utils/security/Email/emailTemplates.js';
import { generateForgotPassWordToken } from '../../../utils/security/jwt/token.js';
import CustomError from '../../../errors/CustomErrors.js';
const forgotPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await checkLoginCredentials(email);

    if (!user) {
      throw new CustomError(
        400,
        'Dados inválidos: verifique e tente novamente',
      );
    }
    const token = generateForgotPassWordToken(user.userId, email);
    const emailContent = forgotPasswordTemplate(user.username, token);
    const emailData = {
      to: email,
      ...emailContent,
    };
    const emailSent = await sendEmail(emailData);
    if (!emailSent) {
      throw new Error();
    }
    return res.status(200).json({
      success: true,
      message: 'Um email foi enviado, verifique sua caixa de entrada',
    });
  } catch (e) {
    next(e);
  }
};
export default forgotPasswordController;
