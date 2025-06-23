import { listFollowers } from '../../model/followModel.js';

const listFollowerController = async (req, res) => {
  const { username } = req.params;

  const result = await listFollowers(username);
  
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: 'Erro ao buscar seguidores',
      error: result.error,
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Dados coletados',
    follower: result.followers,
  });
};

export default listFollowerController;
