const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const esession = require('express-session');
const flash = require('connect-flash');

const db = require('./config/mongoose-connection')

require('dotenv').config();

const ownerRouter = require('./routes/ownerRouter');
const productsRouter = require('./routes/productsRouter');
const userRouter = require('./routes/userRouter');
const index = require('./routes/index');
const { isLoggedIn } = require('./middlewares/isLoggedIn')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(
    esession({
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
)
app.use(flash())

// app.get('/', (req, res) => {
//     res.render('index');
// });

app.use('/owner', ownerRouter);
app.use('/product', productsRouter);
app.use('/user', userRouter);
app.use('/', index);

app.listen(3000)