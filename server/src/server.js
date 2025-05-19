const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Middleware to check if the user is logged in
const isLoggedIn = (req, res, next) => {
    const login = true; 
    if (login) {
        req.body = {
            id: 101,
            username: 'user',
            email: 'user@gmail.com',
            role: 'user'
        };  
        next();
    } else {
        return res.status(401).json({
            message: 'Please login first',
        });
    }
};

// Home route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the server js with nodemon',
    });
});

// Protected route for user profile
app.get('/api/user', isLoggedIn, (req, res) => {
    const userId = req.body.id;
    const username = req.body.username;
    const email = req.body.email;
    const role = req.body.role;
    console.log('userId :',userId);
    res.status(200).json({  // json and send working same for data send to api
        message: 'This is the user profile',
        userId: userId,
        userName: username,
        email : email,
        role: role
    });
});
// 404 rout if find
app.use((req,res,next) =>{
    res.status(404).send({
        message: 'Route not fount',
    })
})
// Server listen
app.listen(3001, () => {
    console.log(`Server is running at: http://localhost:3001`);
});



