import { findUserByUsername } from '../../model/userModel.js';

const profileController = async (req, res) => {
  const { username } = req.params;
  const user = await findUserByUsername(username);

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  return res.status(200).json({
    message: 'User profile retrieved successfully',
    user
  });
};

export default profileController;
