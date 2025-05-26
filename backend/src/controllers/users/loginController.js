import { checkLoginCredentials } from '../../model/userModel.js';
import { compare } from '../../utils/security/bcryptUtils.js';

const loginController = async (req, res) => {
  const { data, password } = req.body;

  const user = await checkLoginCredentials(data);
  const typeOfData = data.includes('@') ? 'email' : 'username';
  if (!user) {
    res.status(401).json({
      message: `Success false, ${typeOfData} or password incorrect`,
      error: 'not found',
    });
  }

  const isValidPassword = await compare(password, user.password);

  if (!isValidPassword) {
    res.status(401).json({
      message: `Success false, ${typeOfData} or password incorrect`,
      error: 'psw',
    });
  }

  //TODO: Criar refresh token e apagar os antigos(se tiver)

  //TODO: Criar access token

  //TODO: Criar salvar novo refresh token no banco

  //TODO: Criar enviar access token

  res.status(200).json({
    message: 'Success true',
  });
};

export default loginController;
