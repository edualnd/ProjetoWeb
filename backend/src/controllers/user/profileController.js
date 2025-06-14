import { findUserByUsername } from '../../model/userModel.js';
import CustomError from '../../errors/CustomErrors.js';
const profileController = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await findUserByUsername(username);

    if (!user) {
      throw new CustomError(404, 'Não encontrado');
    }
    return res.status(200).json({
      sucess: true,
      message: 'Perfil encontrado',
      user,
    });
  } catch (e) {
    next(e);
  }
};

export default profileController;
