import { createComment } from '../../model/commentModel.js';
import { commentSchema } from '../../schemas/commentSchema.js';
import validateSchema from '../../utils/validators/schemaValidator.js';
import CustomError from '../../errors/CustomErrors.js';

const createCommentController = async (req, res) => {
  try {
    const publicationId = +req.params.postId;
    const authorId = req.user.userId;
    const comment = req.body.comment;

    const { success, error, data } = await validateSchema(commentSchema, {
      comment,
    });
    if (!success) {
      throw new CustomError(
        400,
        'Dados inválidos: verifique e tente novamente',
      );
    }

    const newComment = await createComment({
      comment,
      authorId,
      publicationId,
    });

    if (!newComment) {
      throw new Error();
    }
    return res.status(200).json({
      success: true,
      message: 'Comentário criado com sucesso',
      newComment,
    });
  } catch (e) {
    next(e);
  }
};

export default createCommentController;
