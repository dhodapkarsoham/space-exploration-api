const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// ROUTES DECLARATION
const galaxyRoutes = require('./api/routes/galaxies');
const starRoutes = require('./api/routes/stars');
const userRoutes = require('./api/routes/user');

//TODO: REMOVE BEFORE FINAL DEPLOYMENT
const pwd = process.env.MONGO_ATLAS_CONN;
console.log(pwd);


mongoose.connect(
    process.env.MONGO_ATLAS_CONN,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, 
    () => console.log('DB connected')
);
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//TODO: PUSH CHANGES
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


// Routes to handle requests
app.use('/galaxies', galaxyRoutes);
app.use('/stars', starRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;