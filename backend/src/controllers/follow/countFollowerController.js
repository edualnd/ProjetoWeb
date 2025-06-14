import { createSeguindo } from '../../model/followModel.js';

const followUserController = async (req, res, next) => {
  //TO DO: Verificar se não sao iguais (usuario e seguido)

  const usuario = req.user.userId;
  const seguindo = req.body.seguindo;

  const seguir = await createSeguindo(seguindo, usuario);

  //TO DO: Verificar se ja esta seguindo
  if (!seguir.success || req.user.userId == req.user.userId) {
    return res.status(400).json({
      message: 'Já esta seguindo',
      error: seguir.error,
    });
  }
  return res.status(200).json({
    message: 'Seguindo',
    seguir,
  });
};
export default followUserController;
