import CustomError from '../../errors/CustomErrors.js';
import { checkSub, deleteSubscrtiption } from '../../model/eventSubsModel.js';

const deleteEventSubsController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { publicationId } = req.params;
    const isSub = await checkSub(userId, +publicationId);
    if (!isSub) {
      throw new CustomError(400, 'Não inscrito');
    }
    const subs = await deleteSubscrtiption(userId, +publicationId);
    if (!subs) {
      throw new Error();
    }

    return res.status(200).json({
      success: true,
      message: 'inscrição deletada',
      subs,
    });
  } catch (e) {
    next(e);
  }
};

export default deleteEventSubsController;
