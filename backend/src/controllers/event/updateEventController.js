import { updateEvent } from "../../model/postModel.js";
import validateSchema from '../../utils/validators/schemaValidator.js';
import eventSchema from '../../schemas/eventSchema.js'

export default async function updateEventController(req, res, next) {
  try {
    const { authorId, publicationId } = req.params;
    const post = req.body;

    const {success, error, data} = await validateSchema(eventSchema, {
      rating
    });

    if(!success){
      console.log(error)
      return res.status(500).json({ error: error });
    }

    const result = await updateEvent(authorId, +publicationId, post);

    return res.json({
      message: 'Evento atualizado com sucesso!',
      post: result,
    });
  } catch (error) {
    console.error('Erro ao atualizar o evento:', error);
    return res.status(500).json({ error: 'Erro ao atualizar evento' });
  }
}
