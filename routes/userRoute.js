const router = express.Router();
const mongoose = require('mongoose');

const userModel = require('../models/userdb');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /userRoute'
    });
});

router.post('/', (req, res, next) => {
    //create object of model
    const userDetails = new userModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        image: req.body.myImage
    });
    userDetails
        .save()
        .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Handling POST request to /userRoute'
    });
});
