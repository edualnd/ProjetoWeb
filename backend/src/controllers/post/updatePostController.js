import { update } from '../../model/postModel.js';
import postSchema from '../../schemas/postSchema.js';
import validateSchema from '../../utils/validators/schemaValidator.js';

export default async function updatePostController(req, res, next) {
  try {
    const { authorId, publicationId } = req.params;
    const post = req.body;

    const {success, error, data} = await validateSchema(postSchema, {
      text
    });

    if(!success){
      console.log(error)
      return res.status(500).json({ error: error });
    }

    const result = await update(authorId, +publicationId, post);

    return res.json({
      message: 'Post atualizado com sucesso!',
      post: result,
    });
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    return res.status(500).json({ error: 'Erro ao atualizar post' });
  }
}
