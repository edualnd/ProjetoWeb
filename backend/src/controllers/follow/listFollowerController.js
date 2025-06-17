import { listFollowers } from '../../model/followModel.js';

const listFollowerController = async (req, res) => {
const userId = req.user.userId;

  const result = await listFollowers(userId);

  if (!result.success) {
    return res.status(400).json({
      message: 'Erro ao buscar seguidores',
      error: result.error,
    });
  }

  return res.status(200).json({
    message: 'Seguidores',
    //followers: result.followers.map((item) => item.followerBy), ou
    //followers: result,
  });
};

export default listFollowerController;
