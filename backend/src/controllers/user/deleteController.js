import { deleteUser } from "../../model/userModel.js";


const deleteController = async(req, res) => {
  const userId = req.user.userId;
  const deletedUser = await deleteUser(userId);
  if(!deleteUser){
    return res.status(404).json({
      message: 'erro ao deletar',
      error: 'erro ao deletar',
    });
  }
  res.clearCookie('refreshToken', {
    path: '/refresh',
  });
  res.clearCookie('id', {
    path: '/auth',
  });
  return res.status(200).json({
    message: 'User deleted',
    deletedUser
  })
}

export default deleteController
