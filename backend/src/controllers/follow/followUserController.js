import { createSeguindo } from '../../model/followModel.js';

const followUserController = async (req, res, next) => {
  const usuario = req.user.userId;
  const seguindo = req.body.seguindo;

  if (usuario == seguindo) {
    return res.status(400).json({
      success: false,
      message: 'Não pode seguir a si mesmo',
    });
  }
  const seguir = await createSeguindo(seguindo, usuario);

  if (!seguir.success) {
    return res.status(400).json({
      success: false,
      message: 'Já esta seguindo',
      error: seguir.error,
    });
  }
  return res.status(200).json({
    success: true,
    message: 'Seguindo',
    seguir,
  });
};
export default followUserController;
