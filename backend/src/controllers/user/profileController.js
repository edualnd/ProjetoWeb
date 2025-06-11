import { findUserByUsername } from '../../model/userModel.js';

const profileController = async (req, res) => {
  const { username } = req.params;
  const user = await findUserByUsername(username);

  if (!user) {
    return res.status(404).json({
      sucess:false,
      message: 'User not found',
    });
  }
  return res.status(200).json({
    sucess:true,
    message: 'User profile retrieved successfully',
    user
  });
};

export default profileController;
