import { getRatingStatistics } from '../../model/ratingModel.js';

export default async function getRatingStatisticsController(req, res, next) {
  try {
    const { publicationId } = req.params;

    if (!publicationId) {
      return res.status(400).json({ error: 'ID da publicação é obrigatório' });
    }

    const result = await getRatingStatistics(+publicationId);

    // if (result.total === 0) {
    //   return res.status(404).json({
    //     message: 'Nenhuma avaliação encontrada para esta publicação',
    //     publicationId
    //   });
    // }

    return res
      .status(200)
      .json({ success: true, message: 'Media encontrada', rating: result });
  } catch (error) {
    console.error('Erro:', error);
    return res.status(500).json({
      error: 'Erro interno no servidor',
      details: error.message,
      publicationId: req.params.publicationId,
    });
  }
}
