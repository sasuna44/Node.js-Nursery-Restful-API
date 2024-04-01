const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    }, 
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1000);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

function fileFilter(req, file, cb) {
    const FileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (FileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
module.exports = multer({ storage: storage, fileFilter: fileFilter });
