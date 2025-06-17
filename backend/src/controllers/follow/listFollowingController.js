import { listFollowing } from '../../model/followModel.js';

const listFollowingController = async (req, res) => {
  const userId = req.user.userId;

  const result = await listFollowing(userId);

  if (!result.success) {
    return res.status(400).json({
      message: 'Erro ao buscar quem você está seguindo',
      error: result.error,
    });
  }

  return res.status(200).json({
    message: 'Você está seguindo',
    //following: result.following.map((item) => item.following), ou
    //following: result,
  });
};

export default listFollowingController;