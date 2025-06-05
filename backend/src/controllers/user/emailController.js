import { checkRegisteredCredentials } from '../../model/userModel.js';
import validateSchema from '../../utils/validators/schemaValidator.js';
import { userSchema } from '../../schemas/userSchema.js';
const emailController = async (req, res) => {
  const { newEmail } = req.body;
  const { email, userId } = req.user;

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

  return res.status(200).json({
    message: `Um email foi enviado para ${newEmail}, para continuar acesse o link gerado`,
  });
};
export default emailController;
