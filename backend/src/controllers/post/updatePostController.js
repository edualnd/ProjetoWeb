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
    const newFiles = req.files;
    const { deleteX, deleteAll, ...resto } = req.body;

    const post = { ...resto };
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
      //troca duas imagens
      images = { image: photoId[0], video: photoId[1] };
      if (getCurrentImages.image) {
        await deleteFun(getCurrentImages.image);
      }
      if (getCurrentImages.video) {
        await deleteFun(getCurrentImages.video);
      }
    } else if (
      newFiles.length != 0 &&
      photoId.length == 1 &&
      deleteX == undefined
    ) {
      if (getCurrentImages.image == null) {
        images.image = photoId[0];
      } else if (getCurrentImages.video == null) {
        images.video = photoId[0];
      }
    } else if (
      newFiles.length != 0 &&
      photoId.length == 1 &&
      (deleteX === 'image' || deleteX === 'video')
    ) {
      //Troca uma imagem
      images[deleteX] = photoId[0];
      if (getCurrentImages[deleteX]) {
        await deleteFun(getCurrentImages[deleteX]);
      }
    }

    if (newFiles.length == 0 && (deleteX === 'image' || deleteX === 'video')) {
      if (getCurrentImages[deleteX]) {
        await deleteFun(getCurrentImages[deleteX]);
        images[deleteX] = null;
      }
    }

    if (newFiles.length == 0 && deleteAll != undefined) {
      //Deleta tudo

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
    console.log(post);
    const result = await update(+publicationId, {
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

const deleteFun = async (file) => {
  const idFile = file.split('.');
  let id;
  if (idFile[0].startsWith('videos/')) {
    id = idFile[0];
    await deleteVideo(id);
  } else {
    id = idFile[0];
    await deleteFromCloud(id);
  }
};
