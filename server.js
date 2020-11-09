require('./models/userdb');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();

const userController = require('./controllers/userController');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'hbs');

const port = process.env.PORT || 3000;

app.listen(port, err => {
    if(err)
        throw err;
    console.log('Express Server is listening on port ' + port + '!');
});

app.use('/user', userController);
