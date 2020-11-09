//Database connection 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/UserDB', {
    useNewUrlParser: true, useUnifiedTopology: true}, err => {
        if(!err){
        console.log("MongoDB Connection successed!!.")
        } else{
        console.log("Error in Database Connection : " + err)
        }
});

require('./user.model');
