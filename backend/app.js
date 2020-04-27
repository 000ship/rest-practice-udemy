const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const feedRoutes = require('./routes/feed');

const sequelize = require('./util/database');
const Post = require('./models/post');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, "localhost" + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // apllication/json

app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));
// Serving images statically
app.use('/images', express.static(path.join(__dirname, 'images')));

// Allowing Front end apps from other severs
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500 // Default value will be 500
    const message = error.message;
    res.status(status).json({ message: message });
});

// sequelize.sync({ force: true })
sequelize.sync()
    .then(result => {
        app.listen(8080);
    })
    .catch(err => console.log(err));