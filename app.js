require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mediaRouter = require('./routes/media');
const ordersRouter = require('./routes/orders');
const courseRouter = require('./routes/courses');
const chapterRouter = require("./routes/chapters");
const paymentsRouter = require('./routes/payments');
const refreshTokensRouter = require('./routes/refreshTokens');
const mentorsRouter = require('./routes/mentors');
const lessonsRouter = require('./routes/lessons')
const verifyToken = require('./middlewares/verifyToken');

const app = express();

app.use(logger('dev'));
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/media', mediaRouter);
app.use('/courses', courseRouter);
app.use('/chapters', verifyToken, chapterRouter);
app.use('/lessons', verifyToken, lessonsRouter)
app.use('/mentors', mentorsRouter);
app.use('/orders', ordersRouter);
app.use('/payments', paymentsRouter);
app.use('/refresh-tokens', refreshTokensRouter);

module.exports = app;
