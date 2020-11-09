//Create schema for user model
const mongoose = require('mongoose');

var userSchema = new mongoose.Schema;({
    name: String, 
    email: String,
    phone_number: Number,
    image: String
});

//Register our schema with mongoose.
mongoose.model('User', userSchema);   
