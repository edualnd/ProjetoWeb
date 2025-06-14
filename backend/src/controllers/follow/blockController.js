import { block } from '../../model/followModel.js';

const blockController = async (req, res, next) => {
  const bloqueia = req.user.userId;
  const obloqueado = req.body.bloqueia;

  const bloqueado = await block(bloqueia, obloqueado);

  //TO DO: Verificar se ja me segue
  if (block.success) {
    return res.status(400).json({
      message: 'Esse usuario não te segue',
      error: bloqueado.error,
    });
  }
  return res.status(200).json({
    message: 'bloqueado',
    bloqueado,
  });
};
export default blockController;
