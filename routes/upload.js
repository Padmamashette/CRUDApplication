const path = require('path');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'upload/');
    },
    filename: function(req, file, cb) {
        console.log(file);
        cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = function(req, file, cb) {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg'){
        cb(null, true);
    } else{
        cb(null, false);
    }
} 

var upload = multer({storage: storage, fileFilter: fileFilter}).single('myImage');

