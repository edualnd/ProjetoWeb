import { createComment } from '../../model/commentModel.js';
import { commentSchema } from '../../schemas/commentSchema.js';
import validateSchema from '../../utils/validators/schemaValidator.js';

const createCommentController = async (req, res) => {
  const publicationId = +req.params.postId;
  const authorId = req.user.userId;
  const comment = req.body.comment;

  const { success, error, data } = await validateSchema(commentSchema, {
    comment,
  });
  if (!success) {
    return res.status(404).json({
      message: 'Comentario invalido',
      error,
    });
  }

  const newComment = await createComment({ comment, authorId, publicationId });

  if (!newComment) {
    return res.status(400).json({
      message: 'Erro ao criar comentario',
    });
  }
  return res.status(200).json({
    message: 'sucesso',
    newComment,
  });
};

export default createCommentController;
