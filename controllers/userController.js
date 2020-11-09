const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const multer = require('multer');
const path = require('path');

router.use(express.static(__dirname + "./public/"));

//Image upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/');
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
}).single('image');

router.post('/upload', (req, res) => {
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
});

router.get('/', (req, res) => {
    res.render("user/edit", {
        viewTitle: "Insert User"
    });
});

router.post('/', upload, (req, res) => {
   // console.log(req.body);
   if(req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});

function insertRecord(req, res) {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone_number = req.body.phone_number;
    user.image = req.body.image;
    user.save((err, doc) => {
        if (!err){
            res.redirect('user/list');
        } else{
            console.log("Error during recored inserted : " + err);
        }
    });
}

function updateRecord(req, res) {
    User.findByIdAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
       if (!err){
            res.redirect('user/list');
        } else{
            if(err) {
                res.render("user/edit", {
                    viewTitle: "Update User",
                    user: req.body
            });
        } else
           console.log("Error during recored update : " + err);
        }
    });
}


router.get('/list', (req, res) => {
     //res.json('From list');
     User.find((err, docs) => {
         if(!err){
             res.render("user/list", {
                 list: docs
             });
         } else{
            console.log("Error in rertiving user deatils : " + err);
        }
     });
 });
 
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render("user/edit", {
                viewTitle: "Update User",
                user: doc
            });
        } 
    });
});

router.get('/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect("user/list");
        } else{
           console.log("Error in rertiving user delete : " + err);
       }
    });
});

module.exports = router;