import { getSubscription } from '../../model/eventSubsModel.js';

const getEventSubController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const subs = await getSubscription(userId);
    if (!subs) {
      throw new Error();
    }

    return res.status(200).json({
      success: true,
      message: 'inscrições coletadas',
      subs,
    });
  } catch (e) {
    next(e);
  }
};

export default getEventSubController;
