const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const routes = require('./route/routes');
const port =  3001;
app.use(express.json());

// Start the server
app.listen(9992, function () {
    console.log("Server started");
    console.log(`Server is running on port ${port}`);      
});

// Connect to MongoDB using the Promise syntax
mongoose.connect("mongodb://127.0.0.1:27017/BackEndB", 
{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connected to DB");
    })
    .catch((error) => {
        console.log("Error connecting to DB:", error);
    });

app.use(routes);
