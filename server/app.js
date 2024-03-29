const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = require('./api/routes/todos');
const tasksRoutes = require('./api/routes/tasks');


console.log(`env var JWTKEY ${process.env.JWT_KEY}`);
//Mongoose connection
// mongodb+srv://Divya:<password>@cluster0.irrxv.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://Divya:<password>@cluster0.irrxv.mongodb.net/?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://' + process.env.MONGO_ATLAS_USERNAME + ':' + encodeURIComponent(process.env.MONGO_ATLAS_PW) + '@cluster0.irrxv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then( () => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.log(err);
        console.log('Error while connecting to MongoDB');
    });

/* 
    Middlewares
        morgan
        server static files
        bodyparser
        CORS headers
*/
app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

//Routing
app.use('/tasks', tasksRoutes);
app.use('/todos', todoRoutes);

//Error Handling
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
