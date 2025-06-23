import { getCommentData, updateComment } from '../../model/commentModel.js';
import { commentSchema } from '../../schemas/commentSchema.js';
import validateSchema from '../../utils/validators/schemaValidator.js';
import CustomError from '../../errors/CustomErrors.js';
const updateCommentController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const commentId = req.params.commentId;
    const newComment = req.body.comment;

    const comment = await getCommentData(+commentId);
    if (!comment) {
      throw new CustomError(404, 'Comentário não encontrado');
    }
    const { authorId } = comment;

    if (authorId != userId) {
      throw new CustomError(401, 'Você não pode editar esse comentário');
    }

    const { success, error, data } = await validateSchema(commentSchema, {
      comment: newComment,
    });
    if (!success) {
      throw new CustomError(
        400,
        'Dados inválidos: verifique e tente novamente',
      );
    }

    const changedComment = await updateComment(+commentId, {
      comment: newComment,
    });
    if (!changedComment) {
      throw new Error();
    }
    return res.status(200).json({
      success: true,
      message: 'Sucesso',
      changedComment,
    });
  } catch (e) {
    next(e);
  }
};

export default updateCommentController;
