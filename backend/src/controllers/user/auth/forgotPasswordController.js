import { checkLoginCredentials } from '../../../model/userModel.js';
import { sendEmail } from '../../../utils/security/Email/config.js';
import { forgotPasswordTemplate } from '../../../utils/security/Email/emailTemplates.js';
import { generateForgotPassWordToken } from '../../../utils/security/jwt/token.js';

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  const user = await checkLoginCredentials(email);

  if (!user) {
    return res.status(404).json({
      message: 'Success false, user not found',
    });
  }
  const token = generateForgotPassWordToken(user.userId, user.email);
  const emailContent = forgotPasswordTemplate(user.username, token);
  const emailData = {
    to: user.email,
    ...emailContent,
  };
  const emailSent = await sendEmail(emailData);
  if (!emailSent) {
    return res.status(500).json({
      message: 'Success false, error sending email',
    });
  }
  return res.status(200).json({
    message: 'Success true, email sent',
  });
};
export default forgotPasswordController;
