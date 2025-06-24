import { updateRating } from '../../model/ratingModel.js';
import validateSchema from '../../utils/validators/schemaValidator.js';
import ratingSchema from '../../schemas/ratingSchema.js';

export default async function updateRatingController(req, res, next) {
  try {
    const authorId = req.user.userId;
    const { publicationId } = req.params;
    const { rating } = req.body;

    const { success, error, data } = await validateSchema(ratingSchema, {
      rating,
    });

    if (!success) {
      console.log(error);
      return res.status(500).json({ error: error });
    }

    const result = await updateRating(rating, authorId, +publicationId);
    console.log(result);
    return res.status(200).json({
      success: true,
      message: 'Avaliação atualizada com sucesso!',
      rating: result,
    });
  } catch (error) {
    console.error('Erro ao atualizar avaliação:', error);
    return res.status(500).json({ error: 'Erro ao atualizar avaliação' });
  }
}
