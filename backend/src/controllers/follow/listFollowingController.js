import { listFollowing } from '../../model/followModel.js';

const listFollowingController = async (req, res) => {
  const { username } = req.params;

  const result = await listFollowing(username);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: 'Erro ao buscar seguindo',
      error: result.error,
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Dados coletados',
    following: result.following,
  });
};

export default listFollowingController;
