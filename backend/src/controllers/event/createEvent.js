import { createEvent } from '../../model/postModel.js';
import validateSchema from '../../utils/validators/schemaValidator.js';
import eventSchema from '../../schemas/eventSchema.js'

export default async function createEventController(req, res, next) {
  try {
    const user = req.user.userId;
    const role = req.user.userRole;
    
    const { isEvent, text, title } = req.body;
    
    const post = { ...req.body, authorId: user };

    const {success, error, data } = await validateSchema(eventSchema, {
      text, title,
    });
    
    if(!success){
      console.log(error)
      return res.status(500).json({ error: error });
    }

    if (isEvent == true && role != 'COMMOM') {
      const result = await createEvent(post);
      return res.json({
        message: 'Evento criado com sucesso!',
        post: result,
      });
    }
    return res.status(200).json({ message: 'voce não e um profissional' });
  } catch (error) {
    console.log('Erro ao criar o evento:', error);
    return res.status(500).json({ error: error.message });
  }
}
