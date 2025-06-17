import { deleteEvent } from "../../model/postModel.js";

export default async function deleteEventController(req, res, next){
  try {
    const user = req.user.userId;
    const { publicationId } = req.params;

    const result = await deleteEvent(user, +publicationId);

    return res.json({
      message: 'Evento deletado com sucesso!',
      deletedPost: result,
    });
  } catch (error) {
    console.log('Erro ao deletar evento:', error.message);
    return res.status(500).json({ error: error.message });
  }
}