import { block } from '../../model/followModel.js';

const blockController = async (req, res) => {

  const usuario = req.user.userId;
  const seguindo = req.body.seguindo;

  const bloqueado = await block(seguindo, usuario);

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




