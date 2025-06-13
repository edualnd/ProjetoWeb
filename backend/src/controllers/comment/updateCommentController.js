import { getComment, updateComment } from '../../model/commentModel.js';
import { commentSchema } from '../../schemas/commentSchema.js';
import validateSchema from '../../utils/validators/schemaValidator.js';

const updateCommentController = async (req, res) => {
  const userId = req.user.userId;
  const commentId = req.params.commentId;
  const newComment = req.body.comment;

  const comment = await getComment(+commentId);
  if (!comment) {
    return res.status(404).json({
      message: 'Comentario não achado',
    });
  }
  const { authorId } = comment;

  if (!authorId || authorId != userId) {
    return res.status(404).json({
      message: 'Voce não é o autor ou comentario não achado',
    });
  }

  const { success, error, data } = await validateSchema(commentSchema, {
    comment: newComment,
  });
  if (!success) {
    return res.status(404).json({
      message: 'Comentario invalido',
      error,
    });
  }

  const changedComment = await updateComment(+commentId, {
    comment: newComment,
  });

  return res.status(200).json({
    message: 'Sucesso',
    changedComment,
  });
};

export default updateCommentController;
