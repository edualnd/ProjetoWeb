import { getImages, update } from '../../model/postModel.js';
import postSchema from '../../schemas/postSchema.js';
import validateSchema from '../../utils/validators/schemaValidator.js';
import {
  deleteFromCloud,
  deleteVideo,
  uploadCloud,
  uploadVideo,
} from '../../utils/cloudinary/config.js';

export default async function updatePostController(req, res, next) {
  try {
    const { publicationId } = req.params;
    const user = req.user.userId;
    const newFiles = req.files;
    const { deleteX, deleteAll, ...resto } = req.body;

    const post = { ...resto, authorId: user };
    let images = {};

    const { success, error, data } = await validateSchema(postSchema, {
      text: post.text,
    });

    if (!success) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: 'Dados invalidos',
        error: error,
      });
    }
    const photoId = [];
    let cloudImage;
    if (newFiles) {
      for (const p of newFiles) {
        if (p.mimetype.startsWith('image/')) {
          cloudImage = await uploadCloud(p.path);
        } else if (p.mimetype.startsWith('video/')) {
          cloudImage = await uploadVideo(p.path);
        }

        if (!cloudImage) {
          return res.status(500).json({ error: error });
        }

        photoId.push(cloudImage.public_id + '.' + cloudImage.format);
      }
    }
    const getCurrentImages = await getImages(+publicationId);

    if (newFiles.length != 0 && photoId.length == 2) {
      images = { image: photoId[0], video: photoId[1] };
      if (getCurrentImages.image) {
        const idFile = getCurrentImages.image.split('.');
        let id;
        if (idFile[0].startsWith('videos/')) {
          id = idFile[0];
          await deleteVideo(id);
        } else {
          id = idFile[0];
          await deleteFromCloud(id);
        }
      }
      if (getCurrentImages.video) {
        const idFile = getCurrentImages.video.split('.');
        let id;
        if (idFile[0].startsWith('videos/')) {
          id = idFile[0];
          await deleteVideo(id);
        } else {
          id = idFile[0];
          await deleteFromCloud(id);
        }
      }
    } else if (newFiles && photoId.length == 1) {
      images = { [deleteX]: photoId[0] };
      if (getCurrentImages[deleteX]) {
        const idFile = getCurrentImages.image.split('.');
        let id;
        if (idFile[0].startsWith('videos/')) {
          id = idFile[0];
          await deleteVideo(id);
        } else {
          id = idFile[0];
          await deleteFromCloud(id);
        }

       
      }
    }

    if (newFiles.length == 0 && deleteAll) {
      if (getCurrentImages.image) {
        const idFile = getCurrentImages.image.split('.');
        let id;
        if (idFile[0].startsWith('videos/')) {
          id = idFile[0];
          await deleteVideo(id);
        } else {
          id = idFile[0];
          await deleteFromCloud(id);
        }
     
      }
      if (getCurrentImages.video) {
        const idFile = getCurrentImages.video.split('.');
        let id;
        if (idFile[0].startsWith('videos/')) {
          id = idFile[0];
          await deleteVideo(id);
        } else {
          id = idFile[0];
          await deleteFromCloud(id);
        }
      }
      images = { image: null, video: null };
    }

    const result = await update(post.authorId, +publicationId, {
      ...post,
      ...images,
    });

    return res.status(200).json({
      success: true,
      message: 'Post atualizado com sucesso!',
      post: result,
    });
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    return res.status(500).json({ error: 'Erro ao atualizar post' });
  }
}
