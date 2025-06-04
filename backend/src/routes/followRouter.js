import express from 'express';
import seguirController from '../controllers/follow/seguirController.js';

const router = express.Router();

router.post('/', seguirController)

router.get('/', (req, res) => {
    return res.status(200).json({
      data: req.user,
      userId: req.user.userId,
      message: 'User route is working',
    });
  });

export default router;
