import { getUserProfile } from '../../../model/userModel.js';

const userProfileController = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const userProfile = await getUserProfile(userId);
    if (!userProfile) {
      throw new Error();
    }
    return res.status(200).json({
      success: true,
      message: 'Sucesso',
      user: userProfile,
    });
  } catch (e) {
    next(e);
  }
};

export default userProfileController;
