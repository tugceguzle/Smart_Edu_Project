const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
var methodOverride = require('method-override')
// const dotenv = require('dotenv')
require('dotenv').config()

const bodyParser = require('body-parser');

const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');


// const passw = process.env.MONGO_PASSWORD;
const app = express();

//DB CONNECT
mongoose.connect(`mongodb+srv://tugceguzle:${process.env.MONGO_PASSWORD}@cluster0.ogaihcr.mongodb.net/?retryWrites=true&w=majority`);

//Template engine
app.set('view engine', 'ejs');

// Global Variable 
global.userIN = null;

//Middlewares
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'my_keyboard_cat', 
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl:`mongodb+srv://tugceguzle:${process.env.MONGO_PASSWORD}@cluster0.ogaihcr.mongodb.net/?retryWrites=true&w=majority`}),
  })
);
app.use(flash());
app.use((req, res, next)=> {
  res.locals.flashMessages = req.flash();
  next();
})

app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTES
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/user', userRoute);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
