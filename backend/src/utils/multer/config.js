import multer from 'multer';

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); 
  },
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  }
});

const upload = multer({
  storage: storage,
});

export default upload;
