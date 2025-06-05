import {
  changeUsername,
  checkRegisteredCredentials,
} from '../../model/userModel.js';
import validateSchema from '../../utils/validators/schemaValidator.js';
import { userSchema } from '../../schemas/userSchema.js';

const usernameController = async (req, res) => {
  const { userId, username } = req.user;
  const newUsername = req.body.username;
  if (username == newUsername) {
    return res.status(400).json({
      message: 'Mesmo username',
    });
  }

  const checkUsername = await checkRegisteredCredentials('', newUsername);
  const { success, error, data } = await validateSchema(
    userSchema,
    { username: newUsername },
    { email: true, password: true },
  );
  if (checkUsername || !success) {
    return res.status(400).json({
      message: error?.issues[0].message || 'Username já em uso',
    });
  }
  const user = await changeUsername(userId, newUsername);

  if (!user) {
    return res.status(500).json({
      message: 'Erro ao mudar o username',
    });
  }

  return res.status(200).json({
    message: 'username mudado com sucesso',
  });
};

export default usernameController;
