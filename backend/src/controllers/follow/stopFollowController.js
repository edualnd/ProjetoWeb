import { stopFollow } from '../../model/followModel.js';

const stopFollowController = async (req, res, next) => {
  const daUnfollow = req.user.userId;
  const recebeunfollow = req.body.daUnfollow;

  const pararSeguir = await stopFollow(daUnfollow, recebeunfollow);

  if (!pararSeguir.success) {
    return res.status(400).json({
      success: false,
      message: 'Você não segue esse usuario',
      error: pararSeguir.error,
    });
  }
  return res.status(200).json({
    success: true,
    message: 'Parou de seguir',
    pararSeguir,
  });
};
export default stopFollowController;
