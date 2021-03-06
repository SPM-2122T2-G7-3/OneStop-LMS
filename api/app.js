require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

app.use(cors());
app.use(helmet());
app.use((req, res, next) => {
    express.json()(req, res, error => {
        if (error) {
            console.error(error);
            res.status(400).json({
                message: 'Bad Request'
            }); // Bad Request
        }
        next();
    });
});


// Services Routes
const quizRoute = require('./routes/QuizRoute');
app.use('/api/quiz', quizRoute);


const classRoute = require('./routes/ClassRoute');
app.use('/api/class', classRoute);


const userRoute = require('./routes/UserRoute');
app.use('/api/user', userRoute);


const courseRoute = require('./routes/CourseRoute');
app.use('/api/course', courseRoute);


const fileRoute = require('./routes/FileRoute');
app.use('/api/file', fileRoute);


// Server Side Error
app.use((error, req, res, next) => {
    res
        .status(error.status || 500)
        .json({
            message: error.message
        });
});

module.exports = app;