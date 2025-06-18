import { deleteRating } from "../../model/ratingModel.js";

export default async function deleteRatingController(req, res, next){
    try {
        const user = req.user.userId;
        const { publicationId } = req.params;
    
        const result = await deleteRating(user, +publicationId);
    
        return res.json({
          message: 'Avaliação deletada com sucesso!',
          deletedRating: result,
        });
      } catch (error) {
        console.log('Erro ao deletar avaliação:', error.message);
        return res.status(500).json({ error: error.message });
    }
}