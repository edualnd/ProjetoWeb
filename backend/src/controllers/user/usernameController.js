import {
  changeUsername,
  checkRegisteredCredentials,
} from '../../model/userModel.js';
import validateSchema from '../../utils/validators/schemaValidator.js';
import { userSchema } from '../../schemas/userSchema.js';
import CustomError from '../../errors/CustomErrors.js';
const usernameController = async (req, res) => {
  try {
    const { userId, username } = req.user;
    const newUsername = req.body.username;
    if (username == newUsername) {
      throw new CustomError(400, 'Mesmo username');
    }

    const checkUsername = await checkRegisteredCredentials('', newUsername);
    if (checkUsername) {
      throw new CustomError(409, 'Já em uso');
    }
    const { success, error, data } = await validateSchema(
      userSchema,
      { username: newUsername },
      { email: true, password: true },
    );
    if (!success) {
      throw new CustomError(
        400,
        'Dados inválidos: verifique e tente novamente',
      );
    }
    const user = await changeUsername(userId, newUsername);

    if (!user) {
      throw new Error();
    }

    return res.status(200).json({
      success: true,
      message: 'Username alterado com sucesso',
    });
  } catch (e) {
    next(e);
  }
};

export default usernameController;
