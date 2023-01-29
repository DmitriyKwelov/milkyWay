require('dotenv').config()
const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./router/index')
const errorMiddleware = require('./middleware/error-middleware')
const userController = require("./controllers/user-controller");
const authMiddleware = require('./middleware/auth-middleware');

const PORT = process.env.PORT || 5000
const app = express()

mongoose.set('strictQuery', false);

app.use(express.json());
app.use(cookieParser({
    secret: 'yourSecret',
    sameSite: 'none',
    secure: true,
    httpOnly: true,
}));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    // origin: 'http://localhost:3000/'
}));
// app.use(cors());
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://milkyway:fDkhB5sEJ8Qh.Mn@cluster0.db5ebw6.mongodb.net/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch (e) {
        console.log(e);
    }
};

start();