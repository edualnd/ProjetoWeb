import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).json({
    data: req.user,
    userId: req.user.userId,
    message: 'User route is working',
  });
});
export default router;
