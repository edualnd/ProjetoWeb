import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
})

const uploadCloud = (filePath) =>{
  const file = cloudinary.uploader.upload(filePath, (err, result) =>{
    if(err){
      console.log(err)
      return res.status(500).json({ message: 'Erro ao fazer upload da imagem' });
    }
    return result;
  })

  return file;
}
export {uploadCloud};