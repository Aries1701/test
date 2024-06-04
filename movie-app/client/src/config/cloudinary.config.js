const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'drocier3v',
    api_key: '745626759261453',
    api_secret: 'P_DtCLNrjQLIIsgkwCd-HIf6XMo'
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'movie-app',
        format: async (req, file) => 'jpg',
        public_id: (req, file) => file.originalname.split('.')[0]
    }
});

const upload = multer({ storage });

module.exports = upload;