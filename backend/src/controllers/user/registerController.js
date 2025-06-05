import {
  checkRegisteredCredentials,
  registerUser,
} from '../../model/userModel.js';
import { userSchema } from '../../schemas/userSchema.js';
import { hashPass } from '../../utils/security/bcrypt/bcryptUtils.js';

import validateSchema from '../../utils/validators/schemaValidator.js';

const registerController = async (req, res) => {
  try {
    const user = req.body;
    const { success, error, data } = await validateSchema(userSchema, user);
    if (!success) {
      return res.status(400).json({
        message: 'Success false, invalid types in the schema',
        error: error,
      });
    }
    const credentialsAlreadyRegistered = await checkRegisteredCredentials(
      user.email,
      user.username,
    );
    if (credentialsAlreadyRegistered) {
      return res.status(400).json({
        message: 'Success false, user already registered',
      });
    }
    data.password = await hashPass(data.password);
    const newUser = await registerUser(data);
    if (!newUser) {
      return res.status(500).json({
        message: 'Success false, error creating user',
      });
    }
    return res.status(201).json({
      message: 'Success true, user created',
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Success false, server error',
      error: e.message,
    });
  }
};
export default registerController;
