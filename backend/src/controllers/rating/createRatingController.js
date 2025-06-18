import { createRating } from "../../model/ratingModel.js";
import validateSchema from '../../utils/validators/schemaValidator.js';
import ratingSchema from "../../schemas/ratingSchema.js";


// TO DO adicionar validador para o valor da nota no zod

export default async function createRatingController(req, res, next) {

  try{
    const authorId = req.user.userId;
    const {publicationId} = req.params;
    const {rating} = req.body;

    if (rating < 1 || rating > 5) {
      throw new Error('A nota deve estar entre 1 e 5');
    }

      const result = await createRating(rating, authorId , +publicationId);
      return res.json({
        message: 'Avaliação registrada com sucesso!',
        rating: result,
      });
    }catch(error){
    if (error.code === 'P2002') {
      throw new Error('Este usuário já avaliou este produto');
    }
    throw error;
    //console.log('Erro ao registrar avaliação', error);
    //return res.status(500).json({ error: error.message });
  }
}
