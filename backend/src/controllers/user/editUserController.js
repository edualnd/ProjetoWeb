import { editUserProfile, currentUserProfile } from '../../model/userModel.js';
import { profileSchema } from '../../schemas/userSchema.js';
import { deleteFromCloud, uploadCloud } from '../../utils/cloudinary/config.js';
import validateSchema from '../../utils/validators/schemaValidator.js';
import CustomError from '../../errors/CustomErrors.js';
const editUserController = async (req, res) => {
  try {
    const { userId } = req.user;
    const currentProfile = await currentUserProfile(userId);
    const { bio, deletePhoto } = req.body;

    const newBio = bio ? bio : currentProfile.bio;

    let imageUrl = currentProfile.userImage;

    if (req.file) {
      const cloudData = await uploadCloud(req.file.path);
      if (!cloudData) {
        return res.status(400).json({
          message: 'Error uploading image to cloud',
        });
      }
      imageUrl = cloudData.public_id + '.' + cloudData.format;

      if (currentProfile.userImage != null) {
        const oldPhoto = currentProfile.userImage.split('.')[0];
        await deleteFromCloud(oldPhoto);
      }
    } else if (!req.file && deletePhoto == 'true') {
      imageUrl = null;
    }

    const { success } = await validateSchema(profileSchema, {
      bio: newBio,
      userImage: imageUrl,
    });

    if (!success) {
      throw new CustomError(
        400,
        'Dados inválidos: verifique e tente novamente',
      );
    }

    const editProfile = await editUserProfile(userId, {
      bio: newBio,
      userImage: imageUrl,
    });

    if (!editProfile) {
      throw new Error();
    }

    return res.status(200).json({
      sucess: true,
      message: 'Perfil atualizado com sucesso',
      editProfile,
    });
  } catch (e) {
    next(e);
  }
};

export default editUserController;
