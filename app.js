const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
const userRoutes = require('./models/userdb');
const { extname } = require('path');
//const imgUpload = require('./routes/upload');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'upload/');
    },
    filename: function(req, file, cb) {
        console.log(file);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

function checkFileType(file, cb){
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
        return cb(null, true);
    } else{
        cb('Error: Images only!');
    }
} 

var upload = multer({
    storage: storage,  
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
  });

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log("No file uploaded!!");
            return res.send({
              message: err,
              success: false
            });
        
          } else {
            console.log('file uploaded!!');
            return res.send({
              success: true
            })
          }
    })
    // var obj = {
    //     name: req.body.name,
    //     email: req.body.email,
    //     phone_number : req.body.phone_number,
    //     img : {
    //         data: fs.readFileSync(path.join(__dirname + '/upload/' + req.file.fieldname)),
    //         contentType: 'image/jpeg'
    //     }
    // }
    // userRoutes.create(obj, (err, item) =>{
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         res.send("File uploaded successfully");
    //         //res.redirect('/upload');
    //     }
    // });
});

app.listen(port, err => {
    if(err)
        throw err;
    console.log('Server is listening on port ' + port + '!');
});
