import { deleteUser } from '../../model/userModel.js';

const deleteController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const deletedUser = await deleteUser(userId);
    if (!deletedUser) {
      throw new Error();
    }
    res.clearCookie('refreshToken', {
      path: '/refresh',
    });
    res.clearCookie('id', {
      path: '/auth',
    });
    return res.status(200).json({
      success: true,
      message: 'Conta deletada',
    });
  } catch (e) {
    next(e);
  }
};

export default deleteController;
