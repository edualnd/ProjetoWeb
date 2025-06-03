import express from 'express';
import createPostController from '../../controllers/post/createPostController.js';
import updatePostController from '../../controllers/post/updatePostController.js';
import deletePostController from '../../controllers/post/deletePostController.js';
import getPostController from '../../controllers/post/getPostController.js';

const postRoutes = express.Router();

postRoutes.get('/list', getPostController);
postRoutes.post('/', createPostController);
postRoutes.put('/:authorId/:publicationId', updatePostController);
postRoutes.delete('/:authorId/:publicationId', deletePostController);
export default postRoutes;
