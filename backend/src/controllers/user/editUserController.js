import { editUserProfile, currentUserProfile } from '../../model/userModel.js';
import { profileSchema } from '../../schemas/userSchema.js';
import { deleteFromCloud, uploadCloud } from '../../utils/cloudinary/config.js';
import validateSchema from '../../utils/validators/schemaValidator.js';

const editUserController = async (req, res) => {
  const { userId } = req.user;
  const currentProfile = await currentUserProfile(userId);
  const { bio, deletePhoto } = req.body;

  const newBio = (bio) ? bio: currentProfile.bio;
  

  let imageUrl = currentProfile.userImage;
  
  if(req.file){
    const cloudData = await uploadCloud(req.file.path);
    if(!cloudData) {
      return res.status(400).json({
        message: 'Error uploading image to cloud',
      });
    }
    imageUrl = cloudData.public_id + "." + cloudData.format;

    if(currentProfile.userImage != null){
      const oldPhoto = currentProfile.userImage.split(".")[0]
      await deleteFromCloud(oldPhoto)
    }
  }else if(!req.file && deletePhoto == "true") {
    imageUrl = null;
  }

  const {success, error, data} = await validateSchema(profileSchema, {bio: newBio, userImage:imageUrl})

  if (!success) {
    return res.status(404).json({
      message: 'Dados invalidos',
      error,
    });
  }

  const editProfile = await editUserProfile(userId, {bio: newBio, userImage:imageUrl});

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
