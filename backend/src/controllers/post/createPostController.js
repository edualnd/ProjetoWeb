import { create } from '../../model/postModel.js';
import postSchema from '../../schemas/postSchema.js';
import validateSchema from '../../utils/validators/schemaValidator.js';

export default async function createPostController(req, res, next) {

  try{
    const user = req.user.userId;
    const post = { ...req.body, authorId: user };
    const {text} = req.body;

    const {success, error, data} = await validateSchema(postSchema, {
      text
    });

    if(!success){
      console.log(error)
      return res.status(500).json({ error: error });
    }

    const result = await create(post);
    return res.json({
      message: 'Post criado com sucesso!',
      post: result,
    });
  }catch(error){
    console.log('Erro ao criar o post:', error);
    return res.status(500).json({ error: error.message });
  }
}
