import {
  changeEmail,
  checkRegisteredCredentials,
} from '../../../model/userModel.js';
import validateSchema from '../../../utils/validators/schemaValidator.js';
import { userSchema } from '../../../schemas/userSchema.js';

const emailController = async (req, res) => {
  const { newEmail } = req.body;
  const { userId } = req.user;

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
  const chagedUser = await changeEmail(userId, newEmail);

  return res.status(200).json({
    message: `Email alterado com sucesso`,
    chagedUser,
  });
};
export default emailController;
