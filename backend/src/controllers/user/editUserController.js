import { editUserProfile, currentUserProfile } from '../../model/userModel.js';
import { uploadCloud } from '../../utils/cloudinary/config.js';

const editUserController = async (req, res) => {
  const { userId } = req.user;
  const { bio } = req.body;
  const image = req.file;

  const currentProfile = await currentUserProfile(userId);
  if(!image){
    
  }
  const newBio = (!bio) ? currentProfile.bio: bio
  
  
  

  const editProfile = await editUserProfile(userId, {bio});

  // if(!editProfile) {
  //   return res.status(400).json({
  //     message: 'Error updating user profile',
  //     userId: userId,
  //   });
  // }

  return res.status(200).json({
    message: 'User updated successfully',
  });
};


export default editUserController;
