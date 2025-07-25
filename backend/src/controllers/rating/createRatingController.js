import { createRating } from '../../model/ratingModel.js';
import validateSchema from '../../utils/validators/schemaValidator.js';
import ratingSchema from '../../schemas/ratingSchema.js';

export default async function createRatingController(req, res, next) {
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

    const result = await createRating(rating, authorId, +publicationId);

    return res.status(200).json({
      success: true,
      message: 'Avaliação registrada com sucesso!',
      rating: result,
    });
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error('Este usuário já avaliou este evento');
    }
    throw error;
  }
}
