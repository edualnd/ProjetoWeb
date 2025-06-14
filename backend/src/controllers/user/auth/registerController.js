import CustomError from '../../../errors/CustomErrors.js';
import {
  checkRegisteredCredentials,
  registerUser,
} from '../../../model/userModel.js';
import { userSchema } from '../../../schemas/userSchema.js';
import { hashPass } from '../../../utils/security/bcrypt/bcryptUtils.js';

import validateSchema from '../../../utils/validators/schemaValidator.js';

const registerController = async (req, res, next) => {
  try {
    const user = req.body;
    const { success, data } = await validateSchema(userSchema, user);
    if (!success) {
      throw new CustomError(
        400,
        'Dados inválidos: verifique e tente novamente',
      );
    }
    const credentialsAlreadyRegistered = await checkRegisteredCredentials(
      user.email,
      user.username,
    );
    if (credentialsAlreadyRegistered) {
      throw new CustomError(409, 'Username ou Email já cadastrado');
    }
    data.password = await hashPass(data.password);
    const newUser = await registerUser(data);
    if (!newUser) {
      throw new Error();
    }
    return res.status(201).json({
      success: true,
      message: 'Usuario criado com sucesso',
    });
  } catch (e) {
    next(e);
  }
};
export default registerController;
