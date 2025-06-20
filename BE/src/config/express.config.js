const express = require('express');
const app = express();

require('./db.config');

const router = require("./router.config");
const cors = require("cors");

app.use(express.json());

app.use(router)

// router mounting point
app.use(router)

if (process.env.NODE_ENV === 'production') {
    // Serve static files from the React app
    app.use(express.static(path.join(___dirname, 'FE/dist')));

    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(___dirname, 'FE/dist', 'index.html'));
    });
}


// 404 middleware
app.use((req, res, next) => {
   next({
       statusCode: 404,
       message: `Resource not found`,
       detail: null
    });
});

// error handling middleware
app.use((err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    let detail= err.detail || null;


    //handling mongoose validation error
    if (err.code === 11000) {
        const uniqueFieldKeys = Object.keys(err.keyPattern);  // ['email','phone'] throws array of unique failed keys
        console.log(uniqueFieldKeys);
        detail= {};
        detail[uniqueFieldKeys]=uniqueFieldKeys.map(key => `${key} must be unique`).join(','); 
       message='Validation Error';
       statusCode = 400;
        
    }




    res.status(statusCode).json({
        result:detail,
        message:message,
        meta:null
    });

});




// exporting express application
module.exports = app;