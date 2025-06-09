import { editUserProfile, profilePicture } from "../../model/userModel.js";

const editUserController = async(req, res) => {
  console.log(req.user)
  const {userId} = req.user;
  const {bio} = req.body;
  const image = req.file

  const currentProfileImage = await profilePicture(userId);

  const data = {
    bio: bio || null,
    userImage: (!image)? currentProfileImage : image.filename,
  }

  const editProfile = await editUserProfile(userId, data);

  if(!editProfile) {
    return res.status(400).json({
      message: 'Error updating user profile',
      userId: userId,
    });
  }
  

  return res.status(200).json({
    message: 'User updated successfully',
    editProfile

  });
};

export default editUserController;
