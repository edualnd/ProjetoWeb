import {
  editUserProfile,
  currentUserProfile,
  checkRegisteredCredentials,
} from '../../model/userModel.js';
import { profileSchema, userSchema } from '../../schemas/userSchema.js';
import { deleteFromCloud, uploadCloud } from '../../utils/cloudinary/config.js';
import validateSchema from '../../utils/validators/schemaValidator.js';
import CustomError from '../../errors/CustomErrors.js';
const editUserController = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const currentProfile = await currentUserProfile(userId);
    const { bio, deletePhoto, newUsername } = req.body;

    if (username == newUsername) {
      throw new CustomError(400, 'Mesmo username');
    }

    const checkUsername = await checkRegisteredCredentials('', newUsername);
    if (checkUsername) {
      throw new CustomError(409, 'Username já em uso');
    }

    const {
      success: ValidadeSuccess,
      error,
      data,
    } = await validateSchema(
      userSchema,
      { username: newUsername },
      { email: true, password: true },
    );
    if (!ValidadeSuccess) {
      throw new CustomError(
        400,
        'Dados inválidos: verifique e tente novamente',
      );
    }
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
      username: newUsername,
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
